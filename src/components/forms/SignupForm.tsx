import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { OTPVerificationCard } from "./OTPVerificationForm";
import { useSignUp } from "@/hooks/useSignUp";
import { useOtpSend, useOtpVerify } from "@/hooks/useOtp";
import { GoogleButton } from "../buttons/GoogleButton";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Hooks
  const signUp = useSignUp();
  const otpSend = useOtpSend();
  const otpVerify = useOtpVerify();

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    signUp.mutate({ email, password, fullName });
  };

  const error =
    validationError ||
    signUp.error?.message ||
    otpVerify.error?.message ||
    otpSend.error?.message;

  const isLoading = signUp.status === "pending";

  // Show OTP verification card after successful signup
  if (signUp.status === "success") {
    return (
      <OTPVerificationCard
        email={email}
        onVerify={(token) => otpVerify.mutate({ email, token, type: "signup" })}
        onResend={() => otpSend.mutate({ email, type: "signup" })}
        isVerifying={otpVerify.status === "pending"}
        isResending={otpSend.status === "pending"}
        error={otpVerify.error?.message}
        resendSuccess={otpSend.status === "success"}
        className={className}
      />
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleFormSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        {error && <FormAlert type="error" message={error} />}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Field>
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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GoogleButton fnType="signup" disabled={isLoading} />
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
