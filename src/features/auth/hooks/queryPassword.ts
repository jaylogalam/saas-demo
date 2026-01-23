import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { PasswordServices } from "../services/password.services";

/**
 * Request password reset email
 */
export function queryPasswordReset() {
  return mutationOptions({
    mutationFn: (email: string) => PasswordServices.resetPassword({ email, redirectTo: `${window.location.origin}/reset-password` }),
  });
}

/**
 * Update password (used after reset link is clicked)
 */
export function queryPasswordUpdate() {
  const queryClient = useQueryClient();

  return mutationOptions({
    mutationFn: (newPassword: string) => PasswordServices.updatePassword({ password: newPassword }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
    },
  });
}
