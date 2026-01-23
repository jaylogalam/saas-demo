import { useSuspenseQuery } from "@tanstack/react-query";
import { UserServices } from "../services/user.services";

export const useUser = () => {
  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => UserServices.getUser(),
    staleTime: 1000 * 60 * 5,
  });
};
