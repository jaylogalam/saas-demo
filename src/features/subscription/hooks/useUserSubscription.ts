import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useUserStore } from "@/store/userStore";
import type {
    StripeCustomer,
    StripeProduct,
    StripeSubscription,
} from "@/types/database.types";

// ============================================================================
// Types
// ============================================================================

export interface UserSubscription {
    subscription: StripeSubscription;
    productName: string;
    priceInterval: "day" | "week" | "month" | "year" | null;
}

// ============================================================================
// Constants
// ============================================================================

const FIVE_MINUTES = 1000 * 60 * 5;
const ACTIVE_STATUSES = ["active", "trialing"] as const;

// ============================================================================
// Hook
// ============================================================================

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

    return useQuery({
        queryKey: queryKeys.subscription.user(user?.id),
        queryFn: async (): Promise<UserSubscription | null> => {
            if (!user?.email) return null;

            // Find Stripe customer by email
            const { data: customers } = await supabase
                .from("stripe_customers")
                .select("id")
                .eq("email", user?.email)
                .limit(1);

            const customer = customers?.[0] as StripeCustomer | undefined;
            if (!customer) return null;

            // Get active subscription for this customer
            const { data: subscription } = await supabase
                .from("stripe_subscriptions")
                .select("*")
                .eq("customer", customer.id)
                .in("status", ACTIVE_STATUSES)
                .order("created", { ascending: false })
                .limit(1)
                .single();

            if (!subscription) return null;

            const sub = subscription as StripeSubscription;
            const priceItem = sub.items?.data?.[0];
            const productId = priceItem?.price?.product;

            // Get product name
            let productName = "Subscription";
            if (productId) {
                const { data: product } = await supabase
                    .from("stripe_products")
                    .select("name")
                    .eq("id", productId)
                    .single();

                productName = (product as StripeProduct)?.name ??
                    "Subscription";
            }

            return {
                subscription: sub,
                productName,
                priceInterval: priceItem?.price?.recurring?.interval ?? null,
            };
        },
        enabled: !!user?.email,
        staleTime: FIVE_MINUTES,
    });
}
