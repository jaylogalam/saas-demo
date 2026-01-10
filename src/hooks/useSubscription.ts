import { useQuery } from "@tanstack/react-query";
import { subscriptionPlans, getPlanById } from "@/config/subscriptionPlans";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useAuthStore } from "@/store/authStore";
import type {
  SubscriptionPlan,
  BillingInterval,
} from "@/types/subscription.types";

/**
 * Fetch available subscription plans
 * In this implementation, plans are stored locally in config
 */
export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: async () => {
      // Plans are defined in config, but this could fetch from an API
      return subscriptionPlans;
    },
    staleTime: Infinity, // Plans don't change often
  });
}

/**
 * Get a specific plan by ID
 */
export function usePlan(planId: string | undefined) {
  return useQuery({
    queryKey: ["subscription", "plan", planId],
    queryFn: async () => {
      if (!planId) return null;
      return getPlanById(planId) ?? null;
    },
    enabled: !!planId,
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

    if (!paymentLink || paymentLink.includes("XXXX")) {
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
