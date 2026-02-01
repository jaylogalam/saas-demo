// supabase/functions/cancel-subscription/index.ts
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { withMiddleware } from "../_shared/wrapper.ts";
import { getAdminClient, getUserClient } from "../_shared/supabase.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const handler = async (req: Request): Promise<Response> => {
  // 1. Require POST method
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2. Parse request body
  const { subscription_id } = await req.json();

  if (!subscription_id || typeof subscription_id !== "string") {
    return new Response(
      JSON.stringify({ error: "subscription_id is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // 3. Get the authenticated user
  const userClient = getUserClient(req);
  const { data: { user }, error: userError } = await userClient.auth.getUser();

  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 4. Verify ownership: Check if subscription belongs to this user
  const adminClient = getAdminClient();
  const { data: subscription, error: subError } = await adminClient
    .from("user_subscriptions")
    .select("subscription_id, email")
    .eq("subscription_id", subscription_id)
    .single();

  if (subError || !subscription) {
    return new Response(
      JSON.stringify({ error: "Subscription not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  if (subscription.email !== user.email) {
    return new Response(
      JSON.stringify({ error: "You do not own this subscription" }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  // 5. Cancel the subscription at period end via Stripe API
  const cancelledSubscription = await stripe.subscriptions.update(subscription_id, {
    cancel_at_period_end: true,
  });

  return new Response(
    JSON.stringify({
      success: true,
      message: "Subscription will be cancelled at the end of the billing period",
      cancel_at: cancelledSubscription.cancel_at,
      cancel_at_period_end: cancelledSubscription.cancel_at_period_end,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

Deno.serve(withMiddleware(handler));
