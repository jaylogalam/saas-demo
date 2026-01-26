import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as GuestIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types/user.types";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

type ProfileIconProps = React.ComponentPropsWithoutRef<typeof Avatar> & {
  user: Pick<User, "name" | "email" | "avatarUrl">;
};

export const ProfileIcon = forwardRef<
  React.ComponentRef<typeof Avatar>,
  ProfileIconProps
>(({ user, className, ...props }, ref) => {
  return (
    <Avatar
      ref={ref}
      className={cn(
        "size-9 cursor-pointer transition-all rounded-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback className="bg-muted flex items-center justify-center size-full rounded-full">
        <GuestIcon className="size-5 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
});

ProfileIcon.displayName = "ProfileIcon";

export function ProfileIconSkeleton() {
  return <Skeleton className="size-9 aspect-square rounded-full" />;
}
