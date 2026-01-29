import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";

type SignUpProps = {
  email: string;
  password: string;
  fullName: string;
};

export const SignUpServices = {
  signUp: async ({ email, password, fullName }: SignUpProps) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;

    // Supabase returns empty identities array for existing email
    if (data.user?.identities?.length === 0) {
      return new AuthError(
        "An account with this email already exists. Please sign in instead.",
      );
    }
  },
};
