import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Admin, AdminUserView } from "../types/admin.types";
import { AdminServices } from "../services/admin.services";

/**
 * Hook: Check if current user is admin
 */
export const useAdminQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: ["admin", userId],
    queryFn: () => AdminServices.getAdmin(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export function useUserListQueryOptions(isAdmin: Admin) {
  return queryOptions({
    queryKey: ["admin", "user-list"],
    queryFn: () => AdminServices.getUserList(),
    enabled: isAdmin,
    staleTime: 1000 * 60 * 5,
  });
}
