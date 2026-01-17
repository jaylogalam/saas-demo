import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import type { SubscriptionPlan } from "@/types/subscription.types";
import type { StripePrice, StripeProduct } from "@/types/database.types";

const FIVE_MINUTES = 1000 * 60 * 5;

/**
 * Transform Stripe products and prices into SubscriptionPlan format
 */
function transformToSubscriptionPlans(
    products: StripeProduct[],
    prices: StripePrice[],
): SubscriptionPlan[] {
    return products
        .map((product) => {
            const productPrices = prices.filter((p) =>
                p.product === product.id
            );
            const monthlyPrice = productPrices.find(
                (p) => p.recurring?.interval === "month",
            );
            const yearlyPrice = productPrices.find(
                (p) => p.recurring?.interval === "year",
            );

            // Parse metadata
            const features = product.metadata?.features
                ?.split(",")
                .map((f) => f.trim())
                .filter(Boolean) ?? [];
            const highlighted = product.metadata?.highlighted === "true";

            return {
                id: product.id,
                name: product.name,
                description: product.description ?? "",
                price: {
                    monthly: (monthlyPrice?.unit_amount ?? 0) / 100,
                    yearly: (yearlyPrice?.unit_amount ?? 0) / 100,
                },
                priceIds: {
                    monthly: monthlyPrice?.id ?? "",
                    yearly: yearlyPrice?.id ?? "",
                },
                currency: monthlyPrice?.currency ?? yearlyPrice?.currency ??
                    "usd",
                features,
                highlighted,
                paymentLinks: {
                    monthly: product.metadata?.payment_link_monthly ?? "",
                    yearly: product.metadata?.payment_link_yearly ?? "",
                },
            };
        })
        .sort((a, b) => a.price.monthly - b.price.monthly);
}

/**
 * Fetch all subscription plans from Stripe
 */
export function useSubscriptionPlans() {
    return useQuery({
        queryKey: queryKeys.subscription.plans(),
        queryFn: async (): Promise<SubscriptionPlan[]> => {
            const [productsResult, pricesResult] = await Promise.all([
                supabase
                    .from("stripe_products")
                    .select("*")
                    .eq("active", true)
                    .order("name"),
                supabase
                    .from("stripe_prices")
                    .select("*")
                    .eq("active", true)
                    .eq("type", "recurring"),
            ]);

            if (productsResult.error) throw productsResult.error;
            if (pricesResult.error) throw pricesResult.error;

            return transformToSubscriptionPlans(
                productsResult.data as StripeProduct[],
                pricesResult.data as StripePrice[],
            );
        },
        staleTime: FIVE_MINUTES,
    });
}
