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
import { cn } from "@/utils/cn";
import { useSuspenseUserSubscription } from "@/hooks/useUserSubscription";

///////////////////////////////////////
/*        Exported Component         */
///////////////////////////////////////

export function AppLayout() {
  const isMobile = useIsMobile();

  if (isMobile) return <AppMobileLayout />;

  return <AppDesktopLayout />;
}

//////////////////////////////////////
/*          Desktop Layout          */
//////////////////////////////////////

function AppDesktopLayout() {
  const sections = useSidebar();
  const { data: userSubscription } = useSuspenseUserSubscription();
  const subscriptionName = userSubscription && userSubscription[0].name;

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
            <SubscriptionBadge subscriptionName={subscriptionName} />
            <ProfileDropdown showNavItems={true} />
          </div>
        </AppLayoutHeader>
      </AppLayoutContent>
    </AppLayoutContainer>
  );
}

//////////////////////////////////////
/*           Mobile Layout          */
//////////////////////////////////////

function AppMobileLayout() {
  const sections = useSidebar();
  const { data: userSubscription } = useSuspenseUserSubscription();
  const subscriptionName = userSubscription && userSubscription[0].name;

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
            <SubscriptionBadge subscriptionName={subscriptionName} />
            <ProfileDropdown showNavItems={true} />
          </div>
        </AppLayoutHeader>

        <AppLayoutOutlet />
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

function AppLayoutContainer({
  children,
  className,
  ...props
}: AppLayoutContainerProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

function AppLayoutHeader({
  children,
  className,
  ...props
}: AppLayoutHeaderProps) {
  return (
    <header
      className={cn(
        "h-14 border-b bg-background flex items-center justify-between px-4",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

function AppLayoutContent({
  children,
  className,
  ...props
}: AppLayoutContentProps) {
  return (
    <div
      className={cn("flex-1 flex flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AppLayoutOutlet() {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
}
