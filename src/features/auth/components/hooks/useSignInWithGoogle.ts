import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Sign in with Google OAuth
 */
export function useSignInWithGoogle() {
    const {
        mutate: googleSignIn,
        status: googleSignInStatus,
        error: googleSignInError,
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

    const handleGoogleSignIn = () => {
        googleSignIn();
    };

    return { handleGoogleSignIn, googleSignInStatus, googleSignInError };
}
