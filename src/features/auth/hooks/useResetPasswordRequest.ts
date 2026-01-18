import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Request password reset email
 */
export function useResetPasswordRequest() {
    const {
        mutate: resetPasswordRequest,
        status: resetPasswordRequestStatus,
        error: resetPasswordRequestError,
    } = useMutation({
        mutationFn: async (email: string) => {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) throw error;
        },
    });

    const handleResetPasswordRequest = (email: string) => {
        resetPasswordRequest(email);
    };

    return {
        handleResetPasswordRequest,
        resetPasswordRequestStatus,
        resetPasswordRequestError,
    };
}
