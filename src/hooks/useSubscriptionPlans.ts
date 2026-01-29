import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { SubscriptionPlansService } from "@/services/subscription-plans.services";

export function useSubscriptionPlansList() {
  return useQuery({
    queryKey: queryKeys.subscription.plans(),
    queryFn: () => SubscriptionPlansService.getSubscriptionPlans(),
    staleTime: 1000 * 60 * 5,
  });
}
