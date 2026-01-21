import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useUserSubscriptionQueryOptions } from "@/features/subscription/hooks/useUserSubscription";

export const useUserSubscription = () => {
    const user = useUserStore((state) => state.user);
    return useQuery(
        useUserSubscriptionQueryOptions(user?.email || ""),
    );
};

export const useSuspenseUserSubscription = () => {
    const user = useUserStore((state) => state.user);
    return useSuspenseQuery(
        useUserSubscriptionQueryOptions(user?.email || ""),
    );
};
