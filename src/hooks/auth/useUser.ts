import { useSuspenseQuery } from "@tanstack/react-query";
import { UserServices } from "@/services/auth/user.services";
import { queryKeys } from "@/lib/queryKeys";

export const useUser = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => UserServices.getUser(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserList = () => {
  return useSuspenseQuery({
    // TODO: Fix query key
    queryKey: ["auth", "userList"],
    queryFn: () => UserServices.listUsers(),
    staleTime: 1000 * 60 * 5,
  });
};
