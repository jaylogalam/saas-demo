import { Link } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useSignOut } from "@/hooks/useAuth";
import { AppLogo } from "@/components/AppLogo";

export function Navbar() {
  const { user, loading } = useAuthStore();
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <AppLogo />

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <SubscriptionBadge variant="compact" />
              <ProfileDropdown user={userInfo} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
