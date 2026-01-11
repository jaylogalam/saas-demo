import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useAuthStore } from "@/store/authStore";
import type {
  SubscriptionPlan,
  BillingInterval,
} from "@/types/subscription.types";
import type { SupabaseProduct, SupabasePrice } from "@/types/database.types";

/**
 * Transform Supabase products and prices into SubscriptionPlan format
 */
function transformToSubscriptionPlans(
  products: SupabaseProduct[],
  prices: SupabasePrice[]
): SubscriptionPlan[] {
  const plans = products.map((product) => {
    // Get prices for this product
    const productPrices = prices.filter((p) => p.product_id === product.id);
    const monthlyPrice = productPrices.find((p) => p.interval === "month");
    const yearlyPrice = productPrices.find((p) => p.interval === "year");

    // Parse metadata
    const features =
      product.metadata?.features
        ?.split(",")
        .map((f) => f.trim())
        .filter(Boolean) ?? [];
    const highlighted = product.metadata?.highlighted === "true";
    const paymentLinkMonthly = product.metadata?.payment_link_monthly ?? "";
    const paymentLinkYearly = product.metadata?.payment_link_yearly ?? "";

    // Get currency (default to USD)
    const currency = monthlyPrice?.currency ?? yearlyPrice?.currency ?? "usd";

    return {
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      price: {
        monthly: (monthlyPrice?.unit_amount ?? 0) / 100, // Convert cents to dollars
        yearly: (yearlyPrice?.unit_amount ?? 0) / 100,
      },
      currency,
      features,
      highlighted,
      paymentLinks: {
        monthly: paymentLinkMonthly,
        yearly: paymentLinkYearly,
      },
    };
  });

  // Sort by monthly price (cheapest first)
  return plans.sort((a, b) => a.price.monthly - b.price.monthly);
}

/**
 * Fetch available subscription plans from Supabase
 */
export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: async (): Promise<SubscriptionPlan[]> => {
      console.log("Fetching products from Supabase...");

      // Fetch active products
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("name");

      console.log("Products response:", { products, error: productsError });

      if (productsError) {
        console.error("Error fetching products:", productsError);
        throw productsError;
      }

      // Fetch active prices
      const { data: prices, error: pricesError } = await supabase
        .from("prices")
        .select("*")
        .eq("active", true);

      console.log("Prices response:", { prices, error: pricesError });

      if (pricesError) {
        console.error("Error fetching prices:", pricesError);
        throw pricesError;
      }

      // Transform to SubscriptionPlan format
      const plans = transformToSubscriptionPlans(
        products as SupabaseProduct[],
        prices as SupabasePrice[]
      );

      console.log("Transformed plans:", plans);
      return plans;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

/**
 * Get a specific plan by ID
 */
export function usePlan(planId: string | undefined) {
  const { data: plans } = useSubscriptionPlans();

  return useQuery({
    queryKey: ["subscription", "plan", planId],
    queryFn: async () => {
      if (!planId || !plans) return null;
      return plans.find((p) => p.id === planId) ?? null;
    },
    enabled: !!planId && !!plans,
    staleTime: Infinity,
  });
}

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
      console.error("Payment link not configured for this plan");
      alert("Payment is not configured yet. Please contact support.");
      return;
    }

    // Build the payment link URL with prefilled email if user is logged in
    let checkoutUrl = paymentLink;
    if (user?.email) {
      const separator = paymentLink.includes("?") ? "&" : "?";
      checkoutUrl = `${paymentLink}${separator}prefilled_email=${encodeURIComponent(
        user.email
      )}`;
    }

    // Redirect to Stripe Payment Link
    window.location.href = checkoutUrl;
  };

  return { checkout };
}

/**
 * Open Stripe Customer Portal for subscription management
 * Note: Customer Portal URL should be configured in Stripe Dashboard
 */
export function useCustomerPortal() {
  const openPortal = () => {
    // Replace with your Stripe Customer Portal link
    // You can find this in Stripe Dashboard > Settings > Billing > Customer Portal
    const portalUrl = "https://billing.stripe.com/p/login/test_XXXXXX";

    if (portalUrl.includes("XXXX")) {
      console.error("Customer portal link not configured");
      alert(
        "Subscription management is not configured yet. Please contact support."
      );
      return;
    }

    window.open(portalUrl, "_blank");
  };

  return { openPortal };
}
