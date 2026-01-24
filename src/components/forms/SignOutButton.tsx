import { cn } from "@/utils/cn";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/lib/queryKeys";

type SignOutButtonProps = React.ComponentProps<"button">;

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
  const { mutate: signOut } = useSignOut();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <button
      className={cn("flex gap-4", className)}
      onClick={() =>
        signOut(undefined, {
          onSuccess: () => {
            navigate("/");
            queryClient.invalidateQueries({
              queryKey: queryKeys.auth.user(),
            });
          },
        })
      }
      {...props}
    />
  );
}
