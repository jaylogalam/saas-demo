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
import {
  useSignIn,
  useSignInWithGoogle,
} from "@/features/auth/components/hooks";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignIn, signInStatus, signInError } = useSignIn();
  const { handleGoogleSignIn, googleSignInStatus, googleSignInError } =
    useSignInWithGoogle();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(email, password);
  };

  const error = signInError?.message || googleSignInError?.message;
  const isLoading =
    signInStatus === "pending" || googleSignInStatus === "pending";

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleFormSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        {error && <FormAlert type="error" message={error} />}
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* TODO: Fix if user is not registered */}
            <Link
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleGoogleSignIn()}
            disabled={isLoading}
          >
            <GoogleIcon />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
