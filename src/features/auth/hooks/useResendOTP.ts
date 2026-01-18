import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Resend OTP verification email
 */
export function useResendOTP() {
    const {
        mutate: resendOTP,
        status: resendOTPStatus,
        error: resendOTPError,
    } = useMutation({
        mutationFn: async (email: string) => {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email,
            });
            if (error) throw error;
        },
    });

    const handleResendOTP = (email: string) => {
        resendOTP(email);
    };

    return { handleResendOTP, resendOTPStatus, resendOTPError };
}
