import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import {
  useResetPasswordRequest,
  useVerifyOTP,
  useResendOTP,
} from "@/features/auth/hooks";
import { OTPVerificationCard } from "@/features/auth/components/OTPVerificationCard";
import { ArrowLeft } from "lucide-react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");

  const {
    handleResetPasswordRequest,
    resetPasswordRequestStatus,
    resetPasswordRequestError,
  } = useResetPasswordRequest();

  const { handleVerifyOTP, verifyOTPStatus, verifyOTPError } = useVerifyOTP();

  const { handleResendOTP, resendOTPStatus, resendOTPError } = useResendOTP();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleResetPasswordRequest(email);
  };

  // Show OTP verification card after email is sent
  if (resetPasswordRequestStatus === "success") {
    return (
      <OTPVerificationCard
        email={email}
        onVerify={(token) =>
          handleVerifyOTP({ email, token, type: "recovery" })
        }
        onResend={() => handleResendOTP({ email, type: "recovery" })}
        isVerifying={verifyOTPStatus === "pending"}
        isResending={resendOTPStatus === "pending"}
        error={verifyOTPError?.message || resendOTPError?.message}
        resendSuccess={resendOTPStatus === "success"}
        className={className}
      />
    );
  }

  const isLoading = resetPasswordRequestStatus === "pending";

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleFormSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email address and we'll send you a code to reset your
            password.
          </p>
        </div>
        {resetPasswordRequestError && (
          <FormAlert type="error" message={resetPasswordRequestError.message} />
        )}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset code"}
          </Button>
        </Field>
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to login
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}
