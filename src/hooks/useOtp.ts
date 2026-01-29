import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";
import { OtpServices } from "@/services/otp.services";

export const useOtpSend = () => {
  return useMutation({
    mutationFn: (props: Parameters<typeof OtpServices.sendOtp>[0]) =>
      OtpServices.sendOtp(props),
  });
};

export const useOtpVerify = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (props: Parameters<typeof OtpServices.verifyOtp>[0]) =>
      OtpServices.verifyOtp(props),
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
