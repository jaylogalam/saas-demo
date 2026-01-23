import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface OTPSendProps {
  email: string;
  type: "signup" | "recovery";
}

export function useOTPSend() {
  const {
    mutate: OTPSend,
    status: OTPSendStatus,
    error: OTPSendError,
  } = useMutation({
    mutationFn: async ({ type, email }: OTPSendProps) => {
      switch (type) {
        case "signup":
          const { error: signupError } = await supabase.auth.resend({
            type,
            email,
          });
          if (signupError) throw signupError;
          break;

        case "recovery":
          const { error: recoveryError } =
            await supabase.auth.resetPasswordForEmail(email);
          if (recoveryError) throw recoveryError;
          break;
      }
    },
  });

  return {
    OTPSend: (props: OTPSendProps) => OTPSend(props),
    OTPSendStatus,
    OTPSendError,
  };
}
