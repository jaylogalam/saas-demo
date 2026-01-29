import { useSuspenseQuery } from "@tanstack/react-query";
import { UserServices } from "@/services/user.services";
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
    queryKey: queryKeys.auth.list(),
    queryFn: () => UserServices.listUsers(),
    staleTime: 1000 * 60 * 5,
  });
};
