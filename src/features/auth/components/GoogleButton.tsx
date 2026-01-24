import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { useSignInWithGoogle } from "../hooks/useSignIn";

type GoogleButtonProps = {
  fnType: "signup" | "signin";
} & React.ComponentProps<typeof Button>;

export function GoogleButton({ fnType, ...props }: GoogleButtonProps) {
  const signInWithGoogle = useSignInWithGoogle();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        signInWithGoogle.mutate();
      }}
      {...props}
    >
      <GoogleIcon />
      {fnType === "signup" ? "Sign up with Google" : "Log in with Google"}
    </Button>
  );
}
