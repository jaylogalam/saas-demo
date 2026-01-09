import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useSignUp,
  useSignInWithGoogle,
  useVerifyOTP,
  useResendOTP,
} from "@/hooks/useAuth";
import { OTPVerificationCard } from "@/components/OTPVerificationCard";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signUpMutation = useSignUp();
  const googleMutation = useSignInWithGoogle();
  const verifyMutation = useVerifyOTP();
  const resendMutation = useResendOTP();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

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
        {...props}
      />
    );
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
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
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {signUpMutation.isPending
                    ? "Creating account..."
                    : "Create Account"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                >
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="underline hover:text-primary">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
