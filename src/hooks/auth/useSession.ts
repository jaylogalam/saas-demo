import { queryKeys } from "@/lib/queryKeys";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { SessionServices } from "@/services/auth/session.services";

export const useSession = () => {
    return useQuery({
        queryKey: queryKeys.auth.session(),
        queryFn: () => SessionServices.getSession(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useSuspenseSession = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.auth.session(),
        queryFn: () => SessionServices.getSession(),
        staleTime: 1000 * 60 * 5,
    });
};
