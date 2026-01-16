import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type {
    StripeCustomer,
    StripeProduct,
    StripeSubscription,
} from "@/types/database.types";

export interface UserSubscription {
    subscription: StripeSubscription;
    productName: string;
    priceInterval: "day" | "week" | "month" | "year" | null;
}

/**
 * Fetch the current user's subscription via email-based customer lookup
 */
export function useUserSubscription() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: ["user-subscription", user?.id],
        queryFn: async (): Promise<UserSubscription | null> => {
            if (!user?.email) return null;

            // Find Stripe customer by email (use limit instead of single to handle duplicates)
            const { data: customers } = await supabase
                .from("stripe_customers")
                .select("id")
                .eq("email", user.email)
                .limit(1);

            const customer = customers?.[0];
            if (!customer) return null;

            // Get active subscription for this customer
            const { data: subscription } = await supabase
                .from("stripe_subscriptions")
                .select("*")
                .eq("customer", (customer as StripeCustomer).id)
                .in("status", ["active", "trialing"])
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
        staleTime: 1000 * 60 * 5,
    });
}
