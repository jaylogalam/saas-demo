import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface SignUpCredentials {
    email: string;
    password: string;
    fullName: string;
}

/**
 * Create a new account with email, password, and name
 */
export function useSignUp() {
    const { mutate: signUp, status: signUpStatus, error: signUpError } =
        useMutation({
            mutationFn: async (
                { email, password, fullName }: SignUpCredentials,
            ) => {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName },
                    },
                });

                if (error) throw error;

                // Supabase returns empty identities array for existing email
                if (data.user?.identities?.length === 0) {
                    throw new Error(
                        "An account with this email already exists. Please sign in instead.",
                    );
                }

                return data;
            },
        });

    const handleSignUp = (
        email: string,
        password: string,
        fullName: string,
    ) => {
        signUp({ email, password, fullName });
    };

    return { handleSignUp, signUpStatus, signUpError };
}
