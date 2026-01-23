import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";
import { OtpServices } from "../services/otp.services";
import type { OtpParams, OtpVerifyParams } from "../types/otp.types";

export const mutateOtpSend = (props: OtpParams) => {
  return mutationOptions({
    mutationFn: () => OtpServices.sendOtp(props),
  });
};

export const mutateOtpVerify = (props: OtpVerifyParams) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return mutationOptions({
    mutationFn: () => OtpServices.verifyOtp(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.session(),
      });

      if (props.type === "recovery") {
        navigate("/reset-password");
      }
    },
  });
};
