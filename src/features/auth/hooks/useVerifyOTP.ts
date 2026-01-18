import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

interface VerifyOTPCredentials {
    email: string;
    token: string;
}

/**
 * Verify OTP token for email verification
 */
export function useVerifyOTP() {
    const queryClient = useQueryClient();

    const {
        mutate: verifyOTP,
        status: verifyOTPStatus,
        error: verifyOTPError,
    } = useMutation({
        mutationFn: async ({ email, token }: VerifyOTPCredentials) => {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token,
                type: "signup",
            });
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.session(),
            });
        },
    });

    const handleVerifyOTP = (email: string, token: string) => {
        verifyOTP({ email, token });
    };

    return { handleVerifyOTP, verifyOTPStatus, verifyOTPError };
}
