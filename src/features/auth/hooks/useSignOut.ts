import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/lib/queryKeys";
import { SignOutServices } from "../services/sign-out.services";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => SignOutServices.signOut(),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });
    },
  });
};
