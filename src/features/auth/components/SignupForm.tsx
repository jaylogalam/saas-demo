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
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { OTPVerificationCard } from "../components/OTPVerificationCard";
import { useSignUp } from "../hooks/querySignUp";
import { useSignInWithGoogle } from "../hooks/useSignInWithGoogle";
import { useOTPVerify } from "../hooks/useOTPVerify";
import { useOTPSend } from "../hooks/queryOtp";

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
  const { signUp, signUpStatus, signUpError } = useSignUp();
  const { signInWithGoogle, signInWithGoogleStatus, signInWithGoogleError } =
    useSignInWithGoogle();
  const { OTPVerify, OTPVerifyStatus, OTPVerifyError } = useOTPVerify();
  const { OTPSend, OTPSendStatus, OTPSendError } = useOTPSend();

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    signUp({ email, password, fullName });
  };

  const error =
    validationError ||
    signUpError?.message ||
    signInWithGoogleError?.message ||
    OTPVerifyError?.message ||
    OTPSendError?.message;

  const isLoading =
    signUpStatus === "pending" || signInWithGoogleStatus === "pending";

  // Show OTP verification card after successful signup
  if (signUpStatus === "success") {
    return (
      <OTPVerificationCard
        email={email}
        onVerify={(token) => OTPVerify({ email, token, type: "signup" })}
        onResend={() => OTPSend({ email, type: "signup" })}
        isVerifying={OTPVerifyStatus === "pending"}
        isResending={OTPSendStatus === "pending"}
        error={OTPVerifyError?.message}
        resendSuccess={OTPSendStatus === "success"}
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
          <Button
            variant="outline"
            type="button"
            onClick={signInWithGoogle}
            disabled={isLoading}
          >
            <GoogleIcon />
            Sign up with Google
          </Button>
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
