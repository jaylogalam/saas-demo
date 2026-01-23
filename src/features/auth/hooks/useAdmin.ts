import { useSuspenseQuery } from "@tanstack/react-query";
import { AdminServices } from "../services/admin.services";

export const useAdmin = (userId: string) => {
  return useSuspenseQuery({
    queryKey: ["admin"],
    queryFn: () => AdminServices.getAdmin(userId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminUserList = () => {
  return useSuspenseQuery({
    queryKey: ["admin", "user-list"],
    queryFn: () => AdminServices.getUserList(),
    staleTime: 1000 * 60 * 5,
  });
};
