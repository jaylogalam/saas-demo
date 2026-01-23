import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";

interface SignInWithEmailCredentials {
  email: string;
  password: string;
}

/**
 * Sign in with email and password
 * Automatically navigates to dashboard on success
 */
export function useSignInWithEmail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signInWithEmail,
    status: signInWithEmailStatus,
    error: signInWithEmailError,
  } = useMutation({
    mutationFn: async ({ email, password }: SignInWithEmailCredentials) => {
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

  return {
    signInWithEmail: (email: string, password: string) =>
      signInWithEmail({ email, password }),
    signInWithEmailStatus,
    signInWithEmailError,
  };
}
