import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/icons/AppLogo";
import { ProfileDropdown } from "@/features/profile/components/ProfileDropdown";
import { SubscriptionBadge } from "@/features/subscription/components/SubscriptionBadge";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useSignOut } from "@/features/auth/hooks";

export function PublicNavbar() {
  const { user, userInfo, loading } = useUserInfo();
  const signOutMutation = useSignOut();

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-8">
          <AppLogo />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            <Link
              to="/pricing"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <SubscriptionBadge variant="compact" />
              <ProfileDropdown user={userInfo} onLogout={handleLogout} />
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
