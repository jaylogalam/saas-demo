import { Outlet } from "react-router-dom";
import { AppLogo } from "@/components/icons/AppLogo";
import { Menu, X } from "lucide-react";
import { ProfileDropdown } from "@/features/profile/components/ProfileDropdown";
import { SubscriptionBadge } from "@/features/subscription/components/SubscriptionBadge";
import {
  DesktopSidebar,
  DesktopSidebarContent,
  DesktopSidebarHeader,
} from "@/features/sidebar/DesktopSidebar";
import {
  MobileSidebar,
  MobileSidebarContent,
  MobileSidebarHeader,
  MobileSidebarOverlay,
  MobileSidebarToggler,
} from "@/features/sidebar/MobileSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebar } from "@/hooks/useSidebar";
import { useUserSubscription } from "@/features/subscription/hooks/useUserSubscription";
import { useUser } from "@/features/auth/hooks/useUser";
import type { SidebarSection } from "@/features/sidebar/sidebar.types";
import type { User } from "@/features/auth/types/user.types";
import type { UserSubscription } from "@/features/subscription/types";

type AppLayoutProps = {
  user: User | null;
  sections: SidebarSection[];
  subscription: UserSubscription | null;
};

///////////////////////////////////////
/*        Exported Component         */
///////////////////////////////////////

export function AppLayout() {
  const { data: user } = useUser();

  const { data: userSubscription } = useUserSubscription(user);

  const isMobile = useIsMobile();
  const sections = useSidebar();

  if (isMobile)
    return (
      <AppMobileLayout
        user={user}
        sections={sections}
        subscription={userSubscription}
      />
    );

  return (
    <AppDesktopLayout
      user={user}
      sections={sections}
      subscription={userSubscription}
    />
  );
}

//////////////////////////////////////
/*          Desktop Layout          */
//////////////////////////////////////

function AppDesktopLayout({ user, sections, subscription }: AppLayoutProps) {
  return (
    <AppLayoutContainer>
      {/* Sidebar Components */}
      <DesktopSidebar>
        <DesktopSidebarHeader>
          <AppLogo />
        </DesktopSidebarHeader>

        <DesktopSidebarContent sections={sections} />
      </DesktopSidebar>

      {/* Main Content */}
      <AppLayoutContent>
        <AppLayoutHeader>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2 sm:gap-3">
            <SubscriptionBadge subscription={subscription} />
            <ProfileDropdown user={user} />
          </div>
        </AppLayoutHeader>

        <Outlet />
      </AppLayoutContent>
    </AppLayoutContainer>
  );
}

//////////////////////////////////////
/*           Mobile Layout          */
//////////////////////////////////////

function AppMobileLayout({ user, sections, subscription }: AppLayoutProps) {
  return (
    <AppLayoutContainer>
      {/* Sidebar Components */}
      <MobileSidebarOverlay />
      <MobileSidebar>
        <MobileSidebarHeader>
          <AppLogo />
          <MobileSidebarToggler>
            <X size={20} />
          </MobileSidebarToggler>
        </MobileSidebarHeader>

        <MobileSidebarContent sections={sections} />
      </MobileSidebar>

      {/* Main Content */}
      <AppLayoutContent>
        <AppLayoutHeader>
          <MobileSidebarToggler>
            <Menu size={20} />
          </MobileSidebarToggler>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2 sm:gap-3">
            <SubscriptionBadge subscription={subscription} />
            <ProfileDropdown user={user} />
          </div>
        </AppLayoutHeader>

        <Outlet />
      </AppLayoutContent>
    </AppLayoutContainer>
  );
}

////////////////////////////////
/*    Component Prop Types    */
////////////////////////////////

type AppLayoutContainerProps = React.HTMLAttributes<HTMLDivElement>;
type AppLayoutContentProps = React.HTMLAttributes<HTMLDivElement>;
type AppLayoutHeaderProps = React.HTMLAttributes<HTMLHeadElement>;

/////////////////////////////////////
/*    Component Implementations    */
/////////////////////////////////////

function AppLayoutContainer({ children }: AppLayoutContainerProps) {
  return <div className="flex h-screen overflow-hidden">{children}</div>;
}

function AppLayoutHeader({ children }: AppLayoutHeaderProps) {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      {children}
    </header>
  );
}

function AppLayoutContent({ children }: AppLayoutContentProps) {
  return <div className="flex-1 flex flex-col overflow-hidden">{children}</div>;
}
