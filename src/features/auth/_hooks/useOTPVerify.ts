import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";

interface OTPVerifyProps {
  email: string;
  token: string;
  type: "signup" | "recovery";
}

export function useOTPVerify() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: OTPVerify,
    status: OTPVerifyStatus,
    error: OTPVerifyError,
  } = useMutation({
    mutationFn: async ({ email, token, type }: OTPVerifyProps) => {
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

  return {
    OTPVerify: (props: OTPVerifyProps) => OTPVerify(props),
    OTPVerifyStatus,
    OTPVerifyError,
  };
}
