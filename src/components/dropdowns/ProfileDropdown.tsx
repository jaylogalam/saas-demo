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
import type { User as UserType } from "@/types/user.types";
import { useSignOut } from "@/hooks/useSignOut";
import { ProfileIcon } from "@/components/icons/ProfileIcon";

type ProfileDropdownProps = {
  user: Pick<UserType, "name" | "email" | "avatarUrl"> | null;
};

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  if (!user) return null;

  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ProfileIcon user={user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
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

        <DropdownMenuItem asChild>
          {/* Profile Dropdown sign out */}
          <button
            className="flex w-full items-center gap-4"
            onClick={() => signOut()}
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
