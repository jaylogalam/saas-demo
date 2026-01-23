import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useNavigate } from "react-router-dom";
import { OtpServices } from "../services/otp.services";

interface OtpSendProps {
  email: string;
  type: "signup" | "recovery";
}

interface OtpVerifyProps {
  email: string;
  token: string;
  type: "signup" | "recovery";
}

export const queryOTPSend = (props: OtpSendProps) => {
  return mutationOptions({
    mutationFn: () => OtpServices.sendOtp(props),
  });
}

export const queryOTPVerify = (props: OtpVerifyProps) => {
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
}