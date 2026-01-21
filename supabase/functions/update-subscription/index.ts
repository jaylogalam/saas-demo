import Stripe from "npm:stripe@17";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2025-02-24.acacia",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface UpdateSubscriptionRequest {
  subscriptionId: string;
  newPriceId: string;
  preview?: boolean; // If true, return proration preview without making changes
}

interface ProrationPreview {
  immediateAmount: number; // Amount to charge immediately (cents)
  credit: number; // Credit from unused time (cents)
  newPlanCost: number; // New plan cost for remainder (cents)
  effectiveDate: string; // When change takes effect
  isUpgrade: boolean;
  currency: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { subscriptionId, newPriceId, preview = false } =
      (await req.json()) as UpdateSubscriptionRequest;

    if (!subscriptionId || !newPriceId) {
      return new Response(
        JSON.stringify({ error: "subscriptionId and newPriceId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const currentItem = subscription.items.data[0];

    if (!currentItem) {
      return new Response(
        JSON.stringify({ error: "Subscription has no items" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get current and new prices to compare
    const [currentPrice, newPrice] = await Promise.all([
      stripe.prices.retrieve(currentItem.price.id),
      stripe.prices.retrieve(newPriceId),
    ]);

    const currentAmount = currentPrice.unit_amount ?? 0;
    const newAmount = newPrice.unit_amount ?? 0;
    const isUpgrade = newAmount > currentAmount;

    // Preview mode - calculate proration without making changes
    if (preview) {
      const previewInvoice = await stripe.invoices.createPreview({
        subscription: subscriptionId,
        subscription_details: {
          items: [
            {
              id: currentItem.id,
              price: newPriceId,
            },
          ],
          proration_behavior: isUpgrade ? "create_prorations" : "none",
        },
      });

      const prorationPreview: ProrationPreview = {
        immediateAmount: isUpgrade ? Math.max(0, previewInvoice.amount_due) : 0,
        credit: previewInvoice.lines.data
          .filter((line) => line.amount < 0)
          .reduce((sum, line) => sum + Math.abs(line.amount), 0),
        newPlanCost: newAmount,
        effectiveDate: isUpgrade
          ? new Date().toISOString()
          : new Date(subscription.current_period_end * 1000).toISOString(),
        isUpgrade,
        currency: newPrice.currency,
      };

      return new Response(JSON.stringify({ preview: prorationPreview }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Execute the subscription change
    let updatedSubscription: Stripe.Subscription;

    if (isUpgrade) {
      // Upgrade: Change immediately with proration
      updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [
          {
            id: currentItem.id,
            price: newPriceId,
          },
        ],
        proration_behavior: "create_prorations",
        payment_behavior: "error_if_incomplete",
      });
    } else {
      // Downgrade: Schedule for end of billing period
      updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [
          {
            id: currentItem.id,
            price: newPriceId,
          },
        ],
        proration_behavior: "none",
        billing_cycle_anchor: "unchanged",
      });

      // Set the subscription to change at period end by scheduling the update
      // When using from_subscription, Stripe creates a schedule with the current
      // subscription as the first phase. We add a second phase for the new plan.
      await stripe.subscriptionSchedules.create({
        from_subscription: subscriptionId,
        end_behavior: "release",
        phases: [
          {
            items: [{ price: currentItem.price.id }],
            end_date: subscription.current_period_end,
          },
          {
            items: [{ price: newPriceId }],
          },
        ],
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription: {
          id: updatedSubscription.id,
          status: updatedSubscription.status,
          currentPeriodEnd: new Date(
            updatedSubscription.current_period_end * 1000,
          ).toISOString(),
        },
        isUpgrade,
        effectiveDate: isUpgrade
          ? new Date().toISOString()
          : new Date(subscription.current_period_end * 1000).toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Subscription update error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const statusCode = error instanceof Stripe.errors.StripeError ? 400 : 500;

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
