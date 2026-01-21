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
import { useSuspenseUser } from "@/hooks/auth/useUser";
import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useSuspenseUserSubscription } from "@/hooks/useUserSubscription";

export function PublicLayout() {
  const user = useSuspenseUser();

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
  const { data: userSubscriptions } = useSuspenseUserSubscription();
  const subscriptionName = userSubscriptions && userSubscriptions[0].name;

  return (
    <div className="flex items-center gap-4">
      <SubscriptionBadge subscriptionName={subscriptionName} />
      <ProfileDropdown />
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
