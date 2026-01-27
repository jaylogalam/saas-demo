import { queryKeys } from "@/lib/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SessionServices } from "@/services/auth/session.services";

export const useSuspenseSession = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.auth.session(),
        queryFn: () => SessionServices.getSession(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useRole = () => {
    return useSuspenseQuery({
        queryKey: ["role"],
        queryFn: () => SessionServices.getRole(),
        staleTime: 1000 * 60 * 5,
    });
};
