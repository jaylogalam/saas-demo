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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { useUser } from "@/hooks/auth/useUser";
import { useSignOut } from "@/features/auth/_hooks/useSignOut";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileDropdown({ showNavItems }: { showNavItems?: boolean }) {
  const { data: userSubscriptions } = useUserSubscription();
  const userSubscription = userSubscriptions?.[0];
  const user = useUser();
  const isSubscribed = !!userSubscription;
  const { signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full outline-none ring-ring focus-visible:ring-2 transition-all hover:opacity-80">
          <Avatar
            className={`size-9 cursor-pointer border-2 transition-all ${
              isSubscribed
                ? "border-primary/20 shadow-[0_0_12px_rgba(var(--primary),0.5)]"
                : "border-transparent hover:border-primary/20"
            }`}
            style={
              isSubscribed
                ? { boxShadow: "0 0 14px hsl(var(--primary) / 0.4)" }
                : undefined
            }
          >
            <AvatarImage src={user?.avatarUrl} alt={user?.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              <Skeleton className="h-8 w-8 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "No email"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {showNavItems && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/profile">
                  <User className="mr-2 size-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/billing">
                  <CreditCard className="mr-2 size-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/settings">
                  <Settings className="mr-2 size-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={signOut}
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
