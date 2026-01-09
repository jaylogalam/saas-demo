import { useState, useEffect } from "react";
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

interface OTPVerificationCardProps extends React.ComponentProps<typeof Card> {
  email: string;
  onVerify: (otp: string) => void;
  onResend?: () => void;
  isVerifying?: boolean;
  isResending?: boolean;
  error?: string | null;
  resendSuccess?: boolean;
}

export function OTPVerificationCard({
  email,
  onVerify,
  onResend,
  isVerifying = false,
  isResending = false,
  error,
  resendSuccess,
  ...props
}: OTPVerificationCardProps) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Reset countdown when resend is successful
  useEffect(() => {
    if (resendSuccess) {
      setCountdown(60);
    }
  }, [resendSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim()) {
      onVerify(otp.trim());
    }
  };

  const handleResend = () => {
    if (countdown <= 0 && onResend) {
      onResend();
    }
  };

  const canResend = countdown <= 0 && !isResending;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>
          We sent a verification code to <strong>{email}</strong>
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
            {resendSuccess && (
              <div className="p-3 text-sm text-green-600 bg-green-500/10 rounded-md">
                Verification code resent! Check your email.
              </div>
            )}
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <Input
                id="otp"
                type="text"
                placeholder="XXXXXXXX"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center tracking-widest text-lg font-mono"
                maxLength={8}
                required
              />
              <FieldDescription>
                Enter the verification code sent to your email.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Button
                type="submit"
                className="w-full"
                disabled={!otp.trim() || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
              {onResend && (
                <FieldDescription className="text-center">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={!canResend}
                    className="underline hover:text-primary disabled:opacity-50 disabled:no-underline"
                  >
                    {isResending
                      ? "Sending..."
                      : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend"}
                  </button>
                </FieldDescription>
              )}
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
