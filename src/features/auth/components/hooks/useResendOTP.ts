import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface ResendOTPProps {
    email: string;
    type: "signup" | "recovery";
}

export function useResendOTP() {
    const {
        mutate: resendOTP,
        status: resendOTPStatus,
        error: resendOTPError,
    } = useMutation({
        mutationFn: async ({ type, email }: ResendOTPProps) => {
            switch (type) {
                case "signup":
                    const { error: signupError } = await supabase.auth.resend({
                        type,
                        email,
                    });
                    if (signupError) throw signupError;
                    break;

                case "recovery":
                    const { error: recoveryError } = await supabase.auth
                        .resetPasswordForEmail(
                            email,
                        );
                    if (recoveryError) throw recoveryError;
                    break;
            }
        },
    });

    const handleResendOTP = ({ type, email }: ResendOTPProps) => {
        resendOTP({ type, email });
    };

    return { handleResendOTP, resendOTPStatus, resendOTPError };
}
