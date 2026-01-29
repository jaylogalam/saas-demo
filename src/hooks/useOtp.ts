import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";
import { OtpServices } from "@/services/auth/otp.services";
import type { OtpParams, OtpVerifyParams } from "@/types/otp.types";

export const useOtpSend = () => {
  return useMutation({
    mutationFn: (props: OtpParams) => OtpServices.sendOtp(props),
  });
};

export const useOtpVerify = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (props: OtpVerifyParams) => OtpServices.verifyOtp(props),
    onSuccess: (_data, props) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });

      if (props.type === "recovery") {
        navigate("/reset-password");
      }
    },
  });
};
