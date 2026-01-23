import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/lib/queryKeys";
import { SignInServices } from "../services/sign-in.services";

interface SignInWithPasswordProps {
  email: string;
  password: string;
}

export const useSignInWithPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (props: SignInWithPasswordProps) =>
      SignInServices.signInWithPassword(props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
      navigate("/dashboard");
    },
  });
};

export const useSignInWithGoogle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => SignInServices.signInWithGoogle(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
      navigate("/dashboard");
    },
  });
};
