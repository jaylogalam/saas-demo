import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { SubscriptionPlansService } from "@/services/subscription/subscription-plans.services";

export function useSubscriptionPlans() {
  const { data: subscriptionPlans, status: subscriptionPlansStatus } = useQuery(
    {
      queryKey: queryKeys.subscription.plans(),
      queryFn: () => SubscriptionPlansService.getSubscriptionPlans(),
      staleTime: 1000 * 60 * 5,
    },
  );

  return {
    subscriptionPlans,
    subscriptionPlansStatus,
  };
}
