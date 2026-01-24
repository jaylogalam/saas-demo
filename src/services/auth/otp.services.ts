import { supabase } from "@/lib/supabase";
import type { OtpParams, OtpVerifyParams } from "../../types/otp.types";

export const OtpServices = {
  // TODO: Identify return type
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

  // TODO: Identify return type
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
