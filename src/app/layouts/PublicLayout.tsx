import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLogo } from "@/components/icons/AppLogo";
import { ProfileDropdown } from "@/features/profile/components/ProfileDropdown";
import { SubscriptionBadge } from "@/features/subscription/components/SubscriptionBadge";
import {
  Navbar,
  NavbarLinkItem,
  NavbarLinkList,
} from "@/features/navbar/Navbar";
import { useUser } from "@/features/auth/hooks/useUser";
import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useUserSubscription } from "@/features/subscription/hooks/useUserSubscription";

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

        <Suspense fallback={<Skeleton className="h-9 w-9" />}>
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
