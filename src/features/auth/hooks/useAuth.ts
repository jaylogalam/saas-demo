import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Auth Mutation Hooks
// ============================================================================

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

/**
 * Create a new account with email, password, and name
 */
export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password, fullName }: SignUpCredentials) => {
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
}

/**
 * Verify OTP token for email verification
 */
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
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session() });
    },
  });
}

/**
 * Resend OTP verification email
 */
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

/**
 * Sign in with Google OAuth
 */
export function useSignInWithGoogle() {
  return useMutation({
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
}

/**
 * Sign out current user
 * Automatically navigates to home page on success
 */
export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session() });
    },
  });
}

// ============================================================================
// Password Reset Hooks
// ============================================================================

/**
 * Request password reset email
 */
export function useResetPasswordRequest() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    },
  });
}

/**
 * Update password (used after reset link is clicked)
 */
export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session() });
    },
  });
}
