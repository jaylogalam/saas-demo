import { queryOptions } from "@tanstack/react-query";
import { AdminServices } from "../services/admin.services";
import type { Admin } from "../types/admin.types";

/**
 * Hook: Check if current user is admin
 */
export const queryAdmin = (userId: string) => {
  return queryOptions({
    queryKey: ["admin", userId],
    queryFn: () => AdminServices.getAdmin(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const queryAdminUserList = (isAdmin: Admin) => {
  return queryOptions({
    queryKey: ["admin", "user-list"],
    queryFn: () => AdminServices.getUserList(),
    enabled: isAdmin,
    staleTime: 1000 * 60 * 5,
  });
}
