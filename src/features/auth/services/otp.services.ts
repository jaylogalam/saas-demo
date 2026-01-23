import { supabase } from "@/lib/supabase";

type SendOtpProps = {
  email: string;
  type: "signup" | "recovery";
};

type VerifyOtpProps = {
  email: string;
  token: string;
  type: "signup" | "recovery";
};

export const OtpServices = {
  // TODO: Identify return type
  sendOtp: async ({ email, type }: SendOtpProps) => {
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
          .resetPasswordForEmail(email);
        if (recoveryError) throw recoveryError;
        break;
    }
  },

  // TODO: Identify return type
  verifyOtp: async ({ email, token, type }: VerifyOtpProps) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });
    if (error) throw error;
    return data;
  },
};
