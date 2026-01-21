import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Update password (used after reset link is clicked)
 */
export function useUpdatePassword() {
    const queryClient = useQueryClient();

    const {
        mutate: updatePassword,
        status: updatePasswordStatus,
        error: updatePasswordError,
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

    const handleUpdatePassword = (newPassword: string) => {
        updatePassword(newPassword);
    };

    return { handleUpdatePassword, updatePasswordStatus, updatePasswordError };
}
