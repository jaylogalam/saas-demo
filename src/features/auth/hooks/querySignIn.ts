import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/lib/queryKeys";
import { SignInServices } from "../services/sign-in.services";

interface SignInWithPasswordProps {
  email: string;
  password: string;
}

/**
 * Sign in with email and password
 * Automatically navigates to dashboard on success
 */
export const querySignInWithPassword = (props: SignInWithPasswordProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return mutationOptions({
    mutationFn: () => SignInServices.signInWithPassword(props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
      navigate("/dashboard");
    },
  });
}

/**
 * Sign in with Google
 * Automatically navigates to dashboard on success
 */
export const querySignInWithGoogle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return mutationOptions({
    mutationFn: () => SignInServices.signInWithGoogle(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
      navigate("/dashboard");
    },
  });
};