import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";

interface VerifyOTPProps {
    email: string;
    token: string;
    type: "signup" | "recovery";
}

export function useVerifyOTP() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate: verifyOTP,
        status: verifyOTPStatus,
        error: verifyOTPError,
    } = useMutation({
        mutationFn: async ({ email, token, type }: VerifyOTPProps) => {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token,
                type,
            });
            if (error) throw error;
            return data;
        },
        onSuccess: (_, { type }) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.session(),
            });
            if (type === "recovery") {
                navigate("/reset-password");
            }
        },
    });

    const handleVerifyOTP = ({ email, token, type }: VerifyOTPProps) => {
        verifyOTP({ email, token, type });
    };

    return { handleVerifyOTP, verifyOTPStatus, verifyOTPError };
}
