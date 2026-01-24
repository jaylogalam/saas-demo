import { useMutation } from "@tanstack/react-query";
import { SignOutServices } from "@/services/auth/sign-out.services";

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => await SignOutServices.signOut(),
  });
};
