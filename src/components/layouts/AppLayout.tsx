import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SubscriptionBadge } from "@/components/subscription/SubscriptionBadge";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebar } from "@/hooks/useSidebar";
import { useUserSubscription } from "@/hooks/subscription/useUserSubscription";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Page } from "@/components/ui/page";
import MobileSidebar, {
  MobileSidebarToggler,
} from "@/components/layouts/components/MobileSidebar";
import DesktopSidebar from "@/components/layouts/components/DesktopSidebar";

function AppLayout() {
  const isMobile = useIsMobile();
  const sections = useSidebar();

  if (isMobile) return <AppMobileLayout sections={sections} />;

  return <AppDesktopLayout sections={sections} />;
}

function AppDesktopLayout({ sections }: Parameters<typeof DesktopSidebar>[0]) {
  return (
    <AppLayoutContainer>
      <DesktopSidebar sections={sections} />
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

function AppMobileLayout({ sections }: Parameters<typeof MobileSidebar>[0]) {
  return (
    <AppLayoutContainer>
      <MobileSidebar sections={sections} />
      <AppLayoutContent>
        <AppLayoutHeader>
          <MobileSidebarToggler />

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

function PageLoadingSkeleton() {
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

type AppLayoutContainerProps = React.HTMLAttributes<HTMLDivElement>;
type AppLayoutContentProps = React.HTMLAttributes<HTMLDivElement>;
type AppLayoutHeaderProps = React.HTMLAttributes<HTMLHeadElement>;

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

export default AppLayout;
