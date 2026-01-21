import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Admin, AdminUserView } from "../types/admin.types";

// ============================================================================
// Constants
// ============================================================================

const FIVE_MINUTES = 1000 * 60 * 5;

/**
 * Hook: Check if current user is admin
 */
export const useAdminQueryOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["admin", userId],
        queryFn: async (): Promise<Admin> => {
            const { data } = await supabase
                .from("admins")
                .select("id")
                .eq("user_id", userId)
                .single();

            if (!data) return false;
            return true;
        },
        enabled: !!userId,
        staleTime: FIVE_MINUTES,
    });
};

export function useUserListQueryOptions(isAdmin: Admin) {
    return queryOptions({
        queryKey: ["admin", "user-list"],
        queryFn: async (): Promise<AdminUserView[]> => {
            const { data, error } = await supabase
                .from("admin_users_view")
                .select("*")
                .order("joined_at", { ascending: false });

            if (error) throw error;
            return (data as AdminUserView[]) ?? [];
        },
        enabled: isAdmin,
        staleTime: FIVE_MINUTES,
    });
}
