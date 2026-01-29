import { useMutation } from "@tanstack/react-query";
import { SignUpServices } from "@/services/auth/sign-up.services";

type SignUpParams = {
  email: string;
  password: string;
  fullName: string;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (params: SignUpParams) => SignUpServices.signUp(params),
  });
};
