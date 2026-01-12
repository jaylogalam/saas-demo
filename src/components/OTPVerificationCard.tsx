import { useState, useSyncExternalStore, useRef, useCallback } from "react";
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

// Custom hook: countdown timer using useSyncExternalStore
function useCountdown(initialSeconds: number, resetTrigger: unknown) {
  const storeRef = useRef<{
    countdown: number;
    intervalId: ReturnType<typeof setInterval> | null;
    listeners: Set<() => void>;
    lastResetTrigger: unknown;
  } | null>(null);

  // Initialize store lazily
  if (!storeRef.current) {
    storeRef.current = {
      countdown: initialSeconds,
      intervalId: null,
      listeners: new Set(),
      lastResetTrigger: resetTrigger,
    };
  }

  const store = storeRef.current;

  // Handle reset trigger change during render (React 19 pattern)
  if (resetTrigger && resetTrigger !== store.lastResetTrigger) {
    store.countdown = initialSeconds;
    store.lastResetTrigger = resetTrigger;
  }

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      store.listeners.add(onStoreChange);

      // Start timer if not running
      if (!store.intervalId && store.countdown > 0) {
        store.intervalId = setInterval(() => {
          store.countdown = Math.max(0, store.countdown - 1);
          store.listeners.forEach((listener) => listener());

          if (store.countdown <= 0 && store.intervalId) {
            clearInterval(store.intervalId);
            store.intervalId = null;
          }
        }, 1000);
      }

      return () => {
        store.listeners.delete(onStoreChange);
        if (store.listeners.size === 0 && store.intervalId) {
          clearInterval(store.intervalId);
          store.intervalId = null;
        }
      };
    },
    [store]
  );

  const getSnapshot = useCallback(() => store.countdown, [store]);

  const countdown = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const reset = useCallback(() => {
    store.countdown = initialSeconds;
    store.listeners.forEach((listener) => listener());

    // Restart timer if stopped
    if (!store.intervalId) {
      store.intervalId = setInterval(() => {
        store.countdown = Math.max(0, store.countdown - 1);
        store.listeners.forEach((listener) => listener());

        if (store.countdown <= 0 && store.intervalId) {
          clearInterval(store.intervalId);
          store.intervalId = null;
        }
      }, 1000);
    }
  }, [store, initialSeconds]);

  return { countdown, reset };
}

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
  const { countdown, reset } = useCountdown(60, resendSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim()) {
      onVerify(otp.trim());
    }
  };

  const handleResend = () => {
    if (countdown <= 0 && onResend) {
      onResend();
      reset();
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
