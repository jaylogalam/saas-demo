import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/icons/AppLogo";
import { ProfileDropdown } from "@/components/dropdowns/ProfileDropdown";
import { SubscriptionBadge } from "@/components/icons/SubscriptionBadge";
import {
  Navbar,
  NavbarLinkItem,
  NavbarLinkList,
} from "@/components/navigation/Navbar";
import { useUser } from "@/hooks/useUser";
import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { ProfileIconSkeleton } from "@/components/icons/ProfileIcon";

function PublicLayout() {
  const { data: user } = useUser();

  return (
    <div>
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
    </div>
  );
}

function PublicNavbarProfile() {
  const { data: user } = useUser();
  if (!user) return null;

  const { data: userSubscription } = useUserSubscription(user);
  const subscriptionPlan = userSubscription?.plan ?? null;

  return (
    <div className="flex items-center gap-4">
      <SubscriptionBadge subscription={subscriptionPlan} />
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

export default PublicLayout;
