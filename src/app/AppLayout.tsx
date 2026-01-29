import { Outlet } from "react-router-dom";
import { AppLogo } from "@/components/icons/AppLogo";
import { Menu, X } from "lucide-react";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import {
  DesktopSidebar,
  DesktopSidebarContent,
  DesktopSidebarHeader,
} from "@/components/sidebar/DesktopSidebar";
import {
  MobileSidebar,
  MobileSidebarContent,
  MobileSidebarHeader,
  MobileSidebarOverlay,
  MobileSidebarToggler,
} from "@/components/sidebar/MobileSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebar } from "@/hooks/useSidebar";
import { useUserSubscription } from "@/hooks/subscription/useUserSubscription";
import { useUser } from "@/hooks/auth/useUser";
import type { SidebarSection } from "@/types/sidebar.types";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Page } from "@/components/ui/page";

type AppLayoutProps = {
  sections: SidebarSection[];
};

///////////////////////////////////////
/*        Exported Component         */
///////////////////////////////////////

export function AppLayout() {
  const isMobile = useIsMobile();
  const sections = useSidebar();

  if (isMobile) return <AppMobileLayout sections={sections} />;

  return <AppDesktopLayout sections={sections} />;
}

//////////////////////////////////////
/*          Desktop Layout          */
//////////////////////////////////////

function AppDesktopLayout({ sections }: AppLayoutProps) {
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

          <Suspense fallback={<HeaderUserComponentsSkeleton />}>
            <HeaderUserComponents />
          </Suspense>
        </AppLayoutHeader>

        <Suspense fallback={<PageLoadingSkeleton />}>
          <Outlet />
        </Suspense>
      </AppLayoutContent>
    </AppLayoutContainer>
  );
}

//////////////////////////////////////
/*           Mobile Layout          */
//////////////////////////////////////

function AppMobileLayout({ sections }: AppLayoutProps) {
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

          <Suspense fallback={<HeaderUserComponentsSkeleton />}>
            <HeaderUserComponents />
          </Suspense>
        </AppLayoutHeader>

        <Suspense fallback={<PageLoadingSkeleton />}>
          <Outlet />
        </Suspense>
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

function HeaderUserComponents() {
  const { data: user } = useUser();
  const { data: subscription } = useUserSubscription(user);
  const subscriptionPlan = subscription?.plan ?? null;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <SubscriptionBadge subscription={subscriptionPlan} />
      <ProfileDropdown user={user} />
    </div>
  );
}

function HeaderUserComponentsSkeleton() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Skeleton className="h-8 w-24 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <Page>
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </Page>
  );
}
