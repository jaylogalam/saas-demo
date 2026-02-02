import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import type { SubscriptionPlan } from "@/types/subscription.types";
import {
  useUpdateSubscription,
  useUserSubscription,
} from "@/hooks/useUserSubscription";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export function useCheckout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const { data: userSubscription } = useUserSubscription(user);
  const { mutate: updateSubscription, isPending: isUpdating } =
    useUpdateSubscription();

  const handleCheckout = (plan: SubscriptionPlan) => {
    // Check if user is logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if payment link is available (needed for new subscriptions)
    const paymentLink = plan.paymentLink;

    // If user already has a subscription, update it (upgrade/downgrade)
    if (userSubscription) {
      // Don't proceed if already on this plan
      if (userSubscription.plan.id === plan.id) {
        toast.info("You are already on this plan.");
        return;
      }

      updateSubscription(
        {
          subscriptionId: userSubscription.subscriptionId,
          priceId: plan.id,
        },
        {
          onSuccess: () => {
            toast.success("Your subscription has been updated!");
            queryClient.invalidateQueries({
              queryKey: queryKeys.subscription.all,
            });
          },
          onError: (error) => {
            toast.error(
              error.message || "Failed to update subscription. Please try again.",
            );
          },
        },
      );
      return;
    }

    // New subscription flow - redirect to payment link
    if (!paymentLink) {
      toast.error("Payment is not configured yet. Please contact support.");
      return;
    }

    // Open Stripe payment link immediately
    const url = new URL(paymentLink);
    if (user.id) url.searchParams.set("client_reference_id", user.id);
    if (user.email) url.searchParams.set("prefilled_email", user.email);
    window.location.href = url.toString();
  };

  return { handleCheckout, isUpdating };
}
