import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/lib/queryKeys";
import { SignOutServices } from "../services/sign-out.services";

/**
 * Sign out current user
 * Automatically navigates to home page on success
 */
export const querySignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return mutationOptions({
    mutationFn: () => SignOutServices.signOut(),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
    },
  });
}
