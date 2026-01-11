// Follow this setup guide to integrate the Deno runtime and Stripe SDK
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "npm:stripe@^14.21.0";

/* ----------------------------------------------
--- 1. Initialize Stripe
---------------------------------------------- */
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

/* ----------------------------------------------
--- 2. Initialize Supabase (Service Role)
---------------------------------------------- */
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") as string,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string,
);

/* ----------------------------------------------
--- 3. Crypto provider for signature verification
---------------------------------------------- */
const cryptoProvider = Stripe.createSubtleCryptoProvider();
serve(async (req) => {
  try {
    const signature = req.headers.get("Stripe-Signature");
    if (!signature) {
      return new Response("No signature", {
        status: 400,
      });
    }
    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") as string;
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret,
        undefined,
        cryptoProvider,
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return new Response(`Webhook Error: ${errorMessage}`, {
        status: 400,
      });
    }
    console.log(`Received event: ${event.type}`);

    /* -------------------------------------------------------
    --- 4. Handle All Events (Catalog + Subscriptions)
    ------------------------------------------------------- */
    switch (event.type) {
      // --- Catalog Syncing (Your original code) ---
      case "product.created":
      case "product.updated":
        await upsertProduct(event.data.object);
        break;
      case "price.created":
      case "price.updated":
        await upsertPrice(event.data.object);
        break;
      // --- Subscription Management (New additions) ---
      case "checkout.session.completed": {
        const session = event.data.object;
        await handleCheckoutSession(session);
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        await handleInvoicePaid(invoice);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        await updateSubscriptionInDb(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await updateSubscriptionInDb(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(
      JSON.stringify({
        received: true,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`Function Error: ${errorMessage}`);
    return new Response(`Server Error: ${errorMessage}`, {
      status: 500,
    });
  }
});

/* -------------------------------------------------
--- Helper Functions: Catalog ---
------------------------------------------------- */
async function upsertProduct(product) {
  const productData = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };
  const { error } = await supabaseAdmin.from("products").upsert(productData);
  if (error) {
    console.error("Error upserting product:", error);
    throw new Error("Database upsert failed");
  }
  console.log(`Product synced: ${product.id}`);
}

async function upsertPrice(price) {
  const priceData = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    metadata: price.metadata,
  };
  const { error } = await supabaseAdmin.from("prices").upsert(priceData);
  if (error) {
    console.error("Error upserting price:", error);
    throw new Error("Database upsert failed");
  }
  console.log(`Price synced: ${price.id}`);
}

/* -------------------------------------------------
--- Helper Functions: Subscriptions ---
------------------------------------------------- */
async function handleCheckoutSession(session) {
  // Retrieve the userId from metadata (Checkout API) or client_reference_id (Payment Links)
  const userId = session.metadata?.userId || session.client_reference_id;
  const subscriptionId = session.subscription;
  if (!userId || !subscriptionId) {
    console.error("Missing userId in metadata/client_reference_id or subscriptionId");
    return;
  }
  // Fetch full subscription details from Stripe to get dates/status
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  // We use upsertSubscription here to create the initial record
  await upsertSubscription({
    user_id: userId,
    stripe_customer_id: session.customer,
    stripe_subscription_id: subscriptionId,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    current_period_end: new Date(subscription.current_period_end * 1000)
      .toISOString(),
  });
  console.log(`Subscription created for user: ${userId}`);
}

async function handleInvoicePaid(invoice) {
  const subscriptionId = invoice.subscription;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await updateSubscriptionInDb(subscription);
  console.log(`Invoice paid, subscription updated: ${subscriptionId}`);
}

async function updateSubscriptionInDb(sub) {
  const updateData = {
    stripe_subscription_id: sub.id,
    stripe_customer_id: sub.customer ?? undefined,
    status: sub.status,
    price_id: sub.items.data[0].price.id,
    current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
  };

  const { error } = await supabaseAdmin.from("subscriptions").upsert(
    updateData,
    {
      onConflict: "stripe_subscription_id",
    },
  );
  if (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
}

async function upsertSubscription(data) {
  const { error } = await supabaseAdmin.from("subscriptions").upsert(data, {
    onConflict: "stripe_subscription_id",
  });
  if (error) {
    console.error("Error upserting subscription:", error);
    throw error;
  }
}
