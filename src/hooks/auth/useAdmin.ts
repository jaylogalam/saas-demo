import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useAdminQueryOptions } from "@/features/auth/hooks/useAdmin";
import { useSuspenseUser } from "./useUser";

export const useAdmin = () => {
    const user = useSuspenseUser();
    const { data } = useQuery(useAdminQueryOptions(user?.id || ""));
    return data;
};

export const useSuspenseAdmin = () => {
    const user = useSuspenseUser();
    const { data } = useSuspenseQuery(useAdminQueryOptions(user?.id || ""));
    return data;
};
