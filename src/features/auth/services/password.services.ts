import { supabase } from "@/lib/supabase";

type ResetPasswordProps = {
  email: string;
  redirectTo?: string;
};

type UpdatePasswordProps = {
  password: string;
};

export const PasswordServices = {
  // TODO: Identify return type
  resetPassword: async ({ email, redirectTo }: ResetPasswordProps) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });
    if (error) throw error;
  },

  // TODO: Identify return type
  updatePassword: async ({ password }: UpdatePasswordProps) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
  },
};
