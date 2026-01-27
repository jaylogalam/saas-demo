import { useSuspenseQuery } from "@tanstack/react-query";
import { AdminServices } from "@/services/auth/admin.services";

export const useAdminUserList = () => {
  return useSuspenseQuery({
    queryKey: ["admin", "user-list"],
    queryFn: () => AdminServices.getUserList(),
    staleTime: 1000 * 60 * 5,
  });
};
