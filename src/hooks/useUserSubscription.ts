import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { UserSubscriptionServices } from "@/services/user-subscription.services";
import type { User } from "@/types/user.types";

/**
 * Fetch the current user's subscription via email-based customer lookup
 */

export const useUserSubscription = (
  user: Pick<User, "email"> | null,
  options?: { refetchInterval?: number | false },
) => {
  return useSuspenseQuery({
    queryKey: queryKeys.subscription.user(user?.email),
    queryFn: () => UserSubscriptionServices.getUserSubscriptions(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: options?.refetchInterval,
  });
};

export const useUserSubscriptionList = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.subscription.list(),
    queryFn: () => UserSubscriptionServices.listAllUserSubscriptions(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCancelUserSubscription = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) =>
      UserSubscriptionServices.cancelUserSubscription(subscriptionId),
  });
};

export const useRestoreUserSubscription = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) =>
      UserSubscriptionServices.restoreUserSubscription(subscriptionId),
  });
};
