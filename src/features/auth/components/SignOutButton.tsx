import { cn } from "@/utils/cn";
import { useSignOut } from "../_hooks/useSignOut";

type SignOutButtonProps = React.ComponentProps<"button">;

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
  const { signOut } = useSignOut();

  return (
    <button className={cn("flex", className)} onClick={signOut} {...props} />
  );
}
