import { mutationOptions } from "@tanstack/react-query";
import { SignUpServices } from "../services/sign-up.services";

interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
}

/**
 * Create a new account with email, password, and name
 */
export const mutateSignUp = (props: SignUpCredentials) => {
  return mutationOptions({
    mutationFn: () => SignUpServices.signUp(props),
  });
};
