import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

interface SignInCredentials {
    email: string;
    password: string;
}

/**
 * Sign in with email and password
 * Automatically navigates to dashboard on success
 */
export function useSignIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ email, password }: SignInCredentials) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.auth.session(),
            });
            navigate("/dashboard");
        },
    });
}
