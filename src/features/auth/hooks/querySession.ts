import { queryKeys } from "@/lib/queryKeys";
import { queryOptions } from "@tanstack/react-query";
import { SessionServices } from "../services/session.services";

export const querySession = () => {
    return queryOptions({
        queryKey: queryKeys.auth.session(),
        queryFn: () => SessionServices.getSession(),
        staleTime: 1000 * 60 * 5,
    });
};
