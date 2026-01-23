import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { usePasswordReset } from "../hooks/usePassword";
import { useOtpSend, useOtpVerify } from "../hooks/useOtp";
import { OTPVerificationCard } from "./OTPVerificationForm";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Form state
  const [email, setEmail] = useState("");

  // Form hooks
  const passwordReset = usePasswordReset();
  const otpVerify = useOtpVerify();
  const otpSend = useOtpSend();

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    passwordReset.mutate(email);
  };

  // Show OTP verification card after email is sent
  if (passwordReset.isSuccess) {
    return (
      <OTPVerificationCard
        email={email}
        onVerify={(token) =>
          otpVerify.mutate({ email, token, type: "recovery" })
        }
        onResend={() => otpSend.mutate({ email, type: "recovery" })}
        isVerifying={otpVerify.isPending}
        isResending={otpSend.isPending}
        error={otpVerify.error?.message || otpSend.error?.message}
        resendSuccess={otpSend.isSuccess}
        className={className}
      />
    );
  }

  const isLoading = passwordReset.isPending;

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
        {passwordReset.error && (
          <FormAlert type="error" message={passwordReset.error.message} />
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
