import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { useAuthStore } from "@/store/authStore";
import { useSignOut } from "@/hooks/useAuth";

interface AppNavbarProps {
  title?: string;
}

export function AppNavbar({ title = "Dashboard" }: AppNavbarProps) {
  const { user } = useAuthStore();
  const signOutMutation = useSignOut();

  const userInfo = user
    ? {
        name:
          user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : undefined;

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <SubscriptionBadge variant="compact" />
        <ProfileDropdown user={userInfo} onLogout={handleLogout} />
      </div>
    </header>
  );
}
