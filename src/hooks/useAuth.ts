import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
}

interface VerifyOTPCredentials {
  email: string;
  token: string;
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: SignInCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password, fullName }: SignUpCredentials) => {
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

      // Check if email already exists (Supabase returns empty identities array)
      if (data.user && data.user.identities?.length === 0) {
        throw new Error(
          "An account with this email already exists. Please sign in instead."
        );
      }

      return data;
    },
  });
}

export function useVerifyOTP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, token }: VerifyOTPCredentials) => {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
}

export function useResendOTP() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (error) throw error;
    },
  });
}

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
      return data;
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
}
