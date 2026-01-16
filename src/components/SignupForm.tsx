import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  useSignUp,
  useSignInWithGoogle,
  useVerifyOTP,
  useResendOTP,
} from "@/hooks/useAuth";
import { OTPVerificationCard } from "@/components/OTPVerificationCard";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signUpMutation = useSignUp();
  const googleMutation = useSignInWithGoogle();
  const verifyMutation = useVerifyOTP();
  const resendMutation = useResendOTP();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long");
      return;
    }

    signUpMutation.mutate({ email, password, fullName });
  };

  const handleGoogleSignUp = () => {
    googleMutation.mutate();
  };

  const handleVerifyOTP = (otp: string) => {
    verifyMutation.mutate(
      { email, token: otp },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  const handleResendOTP = () => {
    resendMutation.mutate(email);
  };

  const error =
    validationError ||
    signUpMutation.error?.message ||
    googleMutation.error?.message;
  const isLoading = signUpMutation.isPending || googleMutation.isPending;

  // Show OTP verification card after successful signup
  if (signUpMutation.isSuccess) {
    return (
      <OTPVerificationCard
        email={email}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
        isVerifying={verifyMutation.isPending}
        isResending={resendMutation.isPending}
        error={verifyMutation.error?.message}
        resendSuccess={resendMutation.isSuccess}
        className={className}
      />
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
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
            {signUpMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignUp}
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
