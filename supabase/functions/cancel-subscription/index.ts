import Stripe from "npm:stripe@17";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2025-02-24.acacia",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CancelSubscriptionRequest {
  subscriptionId: string;
  cancelImmediately?: boolean; // If true, cancel now; if false, cancel at period end
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subscriptionId, cancelImmediately = false } =
      (await req.json()) as CancelSubscriptionRequest;

    if (!subscriptionId) {
      return new Response(
        JSON.stringify({ error: "subscriptionId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let cancelledSubscription: Stripe.Subscription;

    if (cancelImmediately) {
      // Cancel immediately - subscription ends now
      cancelledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    } else {
      // Cancel at period end - user keeps access until billing period ends
      cancelledSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription: {
          id: cancelledSubscription.id,
          status: cancelledSubscription.status,
          cancelAtPeriodEnd: cancelledSubscription.cancel_at_period_end,
          currentPeriodEnd: new Date(
            cancelledSubscription.current_period_end * 1000,
          ).toISOString(),
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Cancel subscription error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const statusCode = error instanceof Stripe.errors.StripeError ? 400 : 500;

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
