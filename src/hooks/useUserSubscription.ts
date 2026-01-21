import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSessionUser, useSuspenseSessionUser } from "@/hooks/useAuth";
import { useUserSubscriptionQueryOptions } from "@/features/subscription/hooks/useUserSubscription";

export const useUserSubscription = () => {
    const user = useSessionUser();
    return useQuery(
        useUserSubscriptionQueryOptions(user?.email || ""),
    );
};

export const useSuspenseUserSubscription = () => {
    const user = useSuspenseSessionUser();
    return useSuspenseQuery(
        useUserSubscriptionQueryOptions(user?.email || ""),
    );
};
