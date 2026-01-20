import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/icons/AppLogo";
import { ProfileDropdown } from "@/features/profile/components/ProfileDropdown";
import { SubscriptionBadge } from "@/features/subscription/components/SubscriptionBadge";
import { useUserStore } from "@/store/userStore";
import {
  Navbar,
  NavbarLinkItem,
  NavbarLinkList,
} from "@/features/navbar/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export function PublicNavbar() {
  const user = useUserStore((state) => state.user);

  return (
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
  );
}

function PublicNavbarProfile() {
  return (
    <div className="flex items-center gap-4">
      <SubscriptionBadge subscriptionName="Free" />
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
