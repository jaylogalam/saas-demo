// supabase/functions/update-subscription/index.ts
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
    const { subscription_id, price_id } = await req.json();

    if (!subscription_id || typeof subscription_id !== "string") {
        return new Response(
            JSON.stringify({ error: "subscription_id is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    if (!price_id || typeof price_id !== "string") {
        return new Response(
            JSON.stringify({ error: "price_id is required" }),
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

    // 5. Get the current subscription from Stripe to find the subscription item ID
    const stripeSubscription = await stripe.subscriptions.retrieve(subscription_id);

    if (!stripeSubscription.items.data.length) {
        return new Response(
            JSON.stringify({ error: "No subscription items found" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    const subscriptionItemId = stripeSubscription.items.data[0].id;

    // 6. Update the subscription with the new price
    const updatedSubscription = await stripe.subscriptions.update(subscription_id, {
        items: [{
            id: subscriptionItemId,
            price: price_id,
        }],
        proration_behavior: "always_invoice",
    });

    return new Response(
        JSON.stringify({
            success: true,
            message: "Subscription updated successfully",
            subscription: {
                id: updatedSubscription.id,
                status: updatedSubscription.status,
                current_period_end: updatedSubscription.current_period_end,
            },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
    );
};

Deno.serve(withMiddleware(handler));
