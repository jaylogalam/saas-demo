import { supabase } from "@/lib/supabase";

type OtpParams = {
  type: "signup" | "recovery";
  email: string;
};

type OtpVerifyParams = OtpParams & {
  token: string;
};

export const OtpServices = {
  sendOtp: async (params: OtpParams) => {
    switch (params.type) {
      case "signup":
        const { error: signupError } = await supabase.auth.resend({
          type: params.type,
          email: params.email,
        });
        if (signupError) throw signupError;
        break;

      case "recovery":
        const { error: recoveryError } = await supabase.auth
          .resetPasswordForEmail(params.email);
        if (recoveryError) throw recoveryError;
        break;
    }
  },

  verifyOtp: async (params: OtpVerifyParams) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: params.email,
      token: params.token,
      type: params.type,
    });
    if (error) throw error;
    return data;
  },
};
