import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { UserSubscriptionServices } from "@/services/user-subscription.services";
import type { User } from "@/types/user.types";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) =>
      UserSubscriptionServices.cancelUserSubscription(subscriptionId),
    onSuccess: () => {
      toast.success("Subscription cancelled successfully");
      // Invalidate user subscription queries
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key === "user-subscription" || key === "subscription";
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel subscription");
    },
  });
};

export const useRestoreUserSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) =>
      UserSubscriptionServices.restoreUserSubscription(subscriptionId),
    onSuccess: () => {
      toast.success("Subscription resumed successfully");
      // Invalidate user subscription queries
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key === "user-subscription" || key === "subscription";
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to resume subscription");
    },
  });
};

export const useUpdateSubscription = () => {
  return useMutation({
    mutationFn: ({
      subscriptionId,
      priceId,
    }: {
      subscriptionId: string;
      priceId: string;
    }) => UserSubscriptionServices.updateSubscription(subscriptionId, priceId),
  });
};
