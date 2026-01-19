import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useUserStore } from "@/store/userStore";
import { formatSubscriptionInterval } from "../utils/formatSubscriptionInterval";
import type { UserSubscription } from "../types";

/**
 * Fetch the current user's subscription via email-based customer lookup
 *
 * This hook queries the Stripe sync engine tables to find:
 * 1. The Stripe customer matching the user's email
 * 2. Any active/trialing subscription for that customer
 * 3. The product name for display
 */

export function useUserSubscription() {
  const { user } = useUserStore();

  const {
    data: userSubscription,
    status: userSubscriptionStatus,
    refetch: refetchUserSubscription,
  } = useQuery({
    queryKey: queryKeys.subscription.user(user?.id),
    queryFn: async (): Promise<UserSubscription | null> => {
      if (!user?.email) return null;

      // Get Stripe customer by email
      const { data: customer } = await supabase
        .from("stripe_customers")
        .select("id")
        .eq("email", user?.email)
        .limit(1)
        .single();
      if (!customer) return null;

      // Get Stripe subscription by customer id
      const { data: subscription } = await supabase
        .from("stripe_subscriptions")
        .select("*")
        .eq("customer", customer.id)
        .in("status", ["active", "trialing"])
        .order("created", { ascending: false })
        .limit(1)
        .single();
      if (!subscription) return null;

      // Get Stripe price item and product id
      const productId = subscription.items.data[0].price.product;
      const priceID = subscription.items.data[0].price.id;
      if (!productId || !priceID) return null;

      // Get Stripe product details
      const { data: product } = await supabase
        .from("stripe_products")
        .select("*")
        .eq("id", productId)
        .single();
      if (!product) return null;

      // Get Stripe price details
      const { data: price } = await supabase
        .from("stripe_prices")
        .select("*")
        .eq("id", priceID)
        .single();
      if (!price) return null;

      // Return user subscription
      return {
        // Product details
        name: product.name,
        description: product.description,
        features: product.metadata?.features,

        // Price details
        price: price.unit_amount,
        currency: price.currency,
        interval: formatSubscriptionInterval(price.recurring?.interval),

        // Subscription details
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      } as UserSubscription;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  return {
    userSubscription,
    userSubscriptionStatus,
    refetchUserSubscription,
  };
}
