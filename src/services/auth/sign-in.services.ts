import { supabase } from "@/lib/supabase";

type SignInWithPasswordProps = {
  email: string;
  password: string;
};

export const SignInServices = {
  // TODO: Identify return type
  signInWithPassword: async ({ email, password }: SignInWithPasswordProps) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },

  // TODO: Identify return type
  // TODO: Check redirectTo
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) throw error;
  },
};
