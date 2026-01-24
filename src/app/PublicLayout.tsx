import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/icons/AppLogo";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { Navbar, NavbarLinkItem, NavbarLinkList } from "@/components/Navbar";
import { useUser } from "@/hooks/auth/useUser";
import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useUserSubscription } from "@/hooks/subscription/useUserSubscription";
import { ProfileIconSkeleton } from "@/components/icons/ProfileIcon";

export function PublicLayout() {
  const { data: user } = useUser();

  return (
    <PublicLayoutContainer>
      <Navbar>
        <AppLogo />

        <NavbarLinkList>
          <NavbarLinkItem to="/pricing">Pricing</NavbarLinkItem>
          <NavbarLinkItem to="/about">About</NavbarLinkItem>
        </NavbarLinkList>

        <Suspense fallback={<ProfileIconSkeleton />}>
          {user ? <PublicNavbarProfile /> : <PublicNavbarAuthLinks />}
        </Suspense>
      </Navbar>

      <Outlet />
    </PublicLayoutContainer>
  );
}

export function PublicLayoutContainer({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}

function PublicNavbarProfile() {
  const { data: user } = useUser();
  if (!user) return null;

  const { data: userSubscription } = useUserSubscription(user);

  return (
    <div className="flex items-center gap-4">
      <SubscriptionBadge subscription={userSubscription} />
      <ProfileDropdown user={user} />
    </div>
  );
}

function PublicNavbarAuthLinks() {
  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/login">Log in</Link>
      </Button>
      <Button asChild>
        <Link to="/signup">Get Started</Link>
      </Button>
    </>
  );
}
