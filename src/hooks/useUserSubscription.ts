import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSuspenseUser, useUser } from "@/hooks/auth/useUser";
import { useUserSubscriptionQueryOptions } from "@/features/subscription/hooks/useUserSubscription";

export const useUserSubscription = () => {
    const user = useUser();
    return useQuery(
        useUserSubscriptionQueryOptions(user?.email || ""),
    );
};

export const useSuspenseUserSubscription = () => {
    const user = useSuspenseUser();
    return useSuspenseQuery(
        useUserSubscriptionQueryOptions(user?.email || ""),
    );
};
