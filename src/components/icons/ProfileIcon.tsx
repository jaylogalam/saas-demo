import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User as GuestIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types/user.types";

type ProfileIconProps = {
  user: Pick<User, "name" | "email" | "avatarUrl">;
};

export function ProfileIcon({ user }: ProfileIconProps) {
  return (
    <Avatar className="size-9 cursor-pointer transition-all rounded-full overflow-hidden">
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback className="bg-muted flex items-center justify-center size-full rounded-full">
        <GuestIcon className="size-5 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}

export function ProfileIconSkeleton() {
  return <Skeleton className="size-9 aspect-square rounded-full" />;
}
