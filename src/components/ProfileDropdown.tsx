import { LogOut, User, CreditCard, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/components/buttons/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { User as UserType } from "@/types/user.types";

type ProfileDropdownProps = {
  user: Pick<UserType, "name" | "email" | "avatarUrl"> | null;
};

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer transition-all rounded-full overflow-hidden">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-muted flex items-center justify-center size-full rounded-full">
            <User className="size-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          {/* Profile Dropdown label */}
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Profile Dropdown items */}
          <DropdownMenuItem asChild>
            <Link to="/profile">
              <User className="mr-2 size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/billing">
              <CreditCard className="mr-2 size-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          {/* Profile Dropdown sign out */}
          <SignOutButton>
            <LogOut className="size-4" />
            <span>Log out</span>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
