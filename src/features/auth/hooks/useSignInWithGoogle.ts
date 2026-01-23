import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Sign in with Google OAuth
 */
export function useSignInWithGoogle() {
  const {
    mutate: signInWithGoogle,
    status: signInWithGoogleStatus,
    error: signInWithGoogleError,
  } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      return data;
    },
  });

  return {
    signInWithGoogle: () => signInWithGoogle(),
    signInWithGoogleStatus,
    signInWithGoogleError,
  };
}
