import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/features/auth/hooks/useUser";
import { useUserSubscriptionQueryOptions } from "@/features/subscription/hooks/useUserSubscription";

export const useUserSubscription = () => {
  const { data: user } = useUser();
  return useQuery(
    useUserSubscriptionQueryOptions(user?.email || ""),
  );
};
