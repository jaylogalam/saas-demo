import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useSubscriptionPlans } from "./useSubscriptionPlans";

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
