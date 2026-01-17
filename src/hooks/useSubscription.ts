import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useAuthStore } from "@/store/authStore";
import type {
  BillingInterval,
  ProrationPreview,
  SubscriptionPlan,
} from "@/types/subscription.types";
import type { StripePrice, StripeProduct } from "@/types/database.types";

// ============================================================================
// Constants
// ============================================================================

const FIVE_MINUTES = 1000 * 60 * 5;

// ============================================================================
// Transform Functions
// ============================================================================

/**
 * Transform Stripe products and prices into SubscriptionPlan format
 */
function transformToSubscriptionPlans(
  products: StripeProduct[],
  prices: StripePrice[],
): SubscriptionPlan[] {
  return products
    .map((product) => {
      const productPrices = prices.filter((p) => p.product === product.id);
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
        currency: monthlyPrice?.currency ?? yearlyPrice?.currency ?? "usd",
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

// ============================================================================
// Query Hooks
// ============================================================================

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

/**
 * Get a specific plan by ID
 */
export function usePlan(planId: string | undefined) {
  const { data: plans } = useSubscriptionPlans();

  return useQuery({
    queryKey: queryKeys.subscription.plan(planId ?? ""),
    queryFn: () => plans?.find((p) => p.id === planId) ?? null,
    enabled: !!planId && !!plans,
    staleTime: Infinity,
  });
}

// ============================================================================
// Action Hooks
// ============================================================================

/**
 * Handle checkout redirect to Stripe Payment Link
 */
export function useCheckout() {
  const { user } = useAuthStore();
  const { billingInterval } = useSubscriptionStore();

  const checkout = (plan: SubscriptionPlan, interval?: BillingInterval) => {
    const selectedInterval = interval ?? billingInterval;
    const paymentLink = plan.paymentLinks[selectedInterval];

    if (!paymentLink || paymentLink.includes("XXXX") || paymentLink === "") {
      alert("Payment is not configured yet. Please contact support.");
      return;
    }

    const url = new URL(paymentLink);
    if (user?.id) url.searchParams.set("client_reference_id", user.id);
    if (user?.email) url.searchParams.set("prefilled_email", user.email);

    window.open(url.toString(), "_blank");
  };

  return { checkout };
}

/**
 * Open Stripe Customer Portal
 */
export function useCustomerPortal() {
  const openPortal = () => {
    const portalUrl = "https://billing.stripe.com/p/login/test_XXXXXX";

    if (portalUrl.includes("XXXX")) {
      alert(
        "Subscription management is not configured yet. Please contact support.",
      );
      return;
    }

    window.open(portalUrl, "_blank");
  };

  return { openPortal };
}

/**
 * Handle subscription plan changes (upgrades/downgrades)
 */
export function useSubscriptionUpdate() {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Preview the proration for a plan change
   */
  const previewChange = async (
    subscriptionId: string,
    newPriceId: string,
  ): Promise<ProrationPreview | null> => {
    setError(null);

    try {
      console.log("[useSubscriptionUpdate] Calling preview with:", {
        subscriptionId,
        newPriceId,
      });

      const { data, error: fnError } = await supabase.functions.invoke(
        "update-subscription",
        {
          body: {
            subscriptionId,
            newPriceId,
            preview: true,
          },
        },
      );

      console.log("[useSubscriptionUpdate] Preview response:", {
        data,
        fnError,
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      return data?.preview as ProrationPreview;
    } catch (err) {
      console.error("[useSubscriptionUpdate] Preview error:", err);
      const message = err instanceof Error
        ? err.message
        : "Failed to preview changes";
      setError(message);
      return null;
    }
  };

  /**
   * Execute the subscription plan change
   */
  const confirmChange = async (
    subscriptionId: string,
    newPriceId: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "update-subscription",
        {
          body: {
            subscriptionId,
            newPriceId,
            preview: false,
          },
        },
      );

      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);

      // Invalidate subscription queries to refetch updated data
      await queryClient.invalidateQueries({
        queryKey: queryKeys.subscription.all,
      });

      return true;
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : "Failed to update subscription";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    previewChange,
    confirmChange,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
