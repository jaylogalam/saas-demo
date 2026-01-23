import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useUserListQueryOptions } from "@/features/auth/hooks/queryAdmin";
import { useSuspenseAdmin } from "../useAdmin";

export const useAdminUserList = () => {
    const admin = useSuspenseAdmin();
    return useQuery(useUserListQueryOptions(admin));
};

export const useSuspenseAdminUserList = () => {
    const admin = useSuspenseAdmin();
    return useSuspenseQuery(useUserListQueryOptions(admin));
};
