import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { usePasswordReset } from "../hooks/usePasswordReset";
import { useOTPVerify } from "../hooks/useOTPVerify";
import { useOTPSend } from "../hooks/queryOtp";
import { OTPVerificationCard } from "../components/OTPVerificationCard";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");

  const { passwordReset, passwordResetStatus, passwordResetError } =
    usePasswordReset();

  const { OTPVerify, OTPVerifyStatus, OTPVerifyError } = useOTPVerify();

  const { OTPSend, OTPSendStatus, OTPSendError } = useOTPSend();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    passwordReset(email);
  };

  // Show OTP verification card after email is sent
  if (passwordResetStatus === "success") {
    return (
      <OTPVerificationCard
        email={email}
        onVerify={(token) => OTPVerify({ email, token, type: "recovery" })}
        onResend={() => OTPSend({ email, type: "recovery" })}
        isVerifying={OTPVerifyStatus === "pending"}
        isResending={OTPSendStatus === "pending"}
        error={OTPVerifyError?.message || OTPSendError?.message}
        resendSuccess={OTPSendStatus === "success"}
        className={className}
      />
    );
  }

  const isLoading = passwordResetStatus === "pending";

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
        {passwordResetError && (
          <FormAlert type="error" message={passwordResetError.message} />
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
