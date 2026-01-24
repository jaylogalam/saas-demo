import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useUser } from "@/hooks/auth/useUser";
import { redirect } from "react-router-dom";
import type {
  BillingInterval,
  SubscriptionPlan,
} from "@/types/subscription.types";
import { useUserSubscription } from "@/hooks/subscription/useUserSubscription";
import { toast } from "sonner";

/**
 * Handle checkout redirect to Stripe Payment Link
 */
export function useCheckout() {
  // State
  const { billingInterval } = useSubscriptionStore();
  const { data: user } = useUser();

  // Hooks
  const { data: userSubscription } = useUserSubscription(user);

  const handleCheckout = (
    plan: SubscriptionPlan,
    interval?: BillingInterval,
  ) => {
    // Check if user is logged in
    if (!user) {
      redirect("/login");
      return;
    }

    // Check if user is already subscribed to a different plan
    if (!!userSubscription) {
      alert("You are already subscribed to a different plan.");
      return;
    }

    // Check if payment link is available
    const selectedInterval = interval ?? billingInterval;
    const paymentLink = plan.paymentLinks[selectedInterval];

    if (!paymentLink) {
      toast.error(
        "Payment is not configured yet. Please contact support.",
      );
      return;
    }

    const url = new URL(paymentLink);
    if (user?.id) url.searchParams.set("client_reference_id", user.id);
    if (user?.email) url.searchParams.set("prefilled_email", user.email);

    window.open(url.toString(), "_blank");
  };

  return { handleCheckout };
}
