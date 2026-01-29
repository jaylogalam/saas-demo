import { supabase } from "@/lib/supabase";

type ResetPasswordProps = {
  email: string;
  redirectTo?: string;
};

type UpdatePasswordProps = {
  password: string;
};

export const PasswordServices = {
  resetPassword: async ({ email, redirectTo }: ResetPasswordProps) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });
    if (error) throw error;
  },

  updatePassword: async ({ password }: UpdatePasswordProps) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
  },
};
