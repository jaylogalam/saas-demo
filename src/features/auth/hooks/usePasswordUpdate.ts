import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Update password (used after reset link is clicked)
 */
export function usePasswordUpdate() {
  const queryClient = useQueryClient();

  const {
    mutate: passwordUpdate,
    status: passwordUpdateStatus,
    error: passwordUpdateError,
  } = useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
    },
  });

  return {
    passwordUpdate: (newPassword: string) => passwordUpdate(newPassword),
    passwordUpdateStatus,
    passwordUpdateError,
  };
}
