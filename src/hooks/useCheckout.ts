import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import type { SubscriptionPlan } from "@/types/subscription.types";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { toast } from "sonner";

// TODO: Create app checkout page
export function useCheckout() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: userSubscription } = useUserSubscription(user);

  const handleCheckout = (plan: SubscriptionPlan) => {
    // Check if user is logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if user is already subscribed to a different plan
    if (!!userSubscription) {
      alert("You are already subscribed to a different plan.");
      return;
    }

    // Check if payment link is available
    const paymentLink = plan.paymentLink;

    if (!paymentLink) {
      toast.error(
        "Payment is not configured yet. Please contact support.",
      );
      return;
    }

    // Open Stripe payment link immediately
    const url = new URL(paymentLink);
    if (user.id) url.searchParams.set("client_reference_id", user.id);
    if (user.email) url.searchParams.set("prefilled_email", user.email);
    window.location.href = url.toString();
  };

  return { handleCheckout };
}
