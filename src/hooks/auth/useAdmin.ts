import { useSuspenseQuery } from "@tanstack/react-query";
import { AdminServices } from "@/services/auth/admin.services";
import type { User } from "@supabase/supabase-js";

export const useAdmin = (user: Pick<User, "id"> | null) => {
  return useSuspenseQuery({
    queryKey: ["admin"],
    queryFn: () => AdminServices.getAdmin(user),
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
