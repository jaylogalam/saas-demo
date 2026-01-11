import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type {
    SupabaseProduct,
    SupabaseSubscription,
} from "@/types/database.types";

export interface UserSubscription {
    subscription: SupabaseSubscription;
    productName: string;
    priceInterval: "month" | "year" | null;
}

/**
 * Fetch the current user's subscription from Supabase
 */
export function useUserSubscription() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: ["user-subscription", user?.id],
        queryFn: async (): Promise<UserSubscription | null> => {
            if (!user?.id) return null;

            // Fetch user's subscription
            const { data: subscription, error: subError } = await supabase
                .from("subscriptions")
                .select("*")
                .eq("user_id", user.id)
                .in("status", ["active", "trialing"])
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (subError || !subscription) {
                return null;
            }

            // Fetch the price with interval and product_id
            const { data: price } = await supabase
                .from("prices")
                .select("product_id, interval")
                .eq("id", subscription.price_id)
                .single();

            if (!price?.product_id) {
                return {
                    subscription: subscription as SupabaseSubscription,
                    productName: "Subscription",
                    priceInterval: price?.interval ?? null,
                };
            }

            const { data: product } = await supabase
                .from("products")
                .select("name")
                .eq("id", price.product_id)
                .single();

            return {
                subscription: subscription as SupabaseSubscription,
                productName: (product as SupabaseProduct)?.name ||
                    "Subscription",
                priceInterval: price?.interval ?? null,
            };
        },
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
}
