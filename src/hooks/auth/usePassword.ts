import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { PasswordServices } from "@/services/auth/password.services";

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) =>
      PasswordServices.resetPassword({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      }),
  });
};

export const usePasswordUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPassword: string) =>
      PasswordServices.updatePassword({ password: newPassword }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
    },
  });
};
