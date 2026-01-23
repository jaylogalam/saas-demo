import { supabase } from "@/lib/supabase";

type ForgotPasswordProps = {
  email: string;
  redirectTo?: string;
};

type ResetPasswordProps = {
  email: string;
  password: string;
};

export const PasswordServices = {
  // TODO: Identify return type
  forgotPassword: async ({ email, redirectTo }: ForgotPasswordProps) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });
    if (error) throw error;
  },

  // TODO: Identify return type
  resetPassword: async ({ email, password }: ResetPasswordProps) => {
    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });
    if (error) throw error;
  },
};
