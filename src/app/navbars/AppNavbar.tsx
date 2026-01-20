import { ProfileDropdown } from "@/features/profile/components/ProfileDropdown";
import { SubscriptionBadge } from "@/features/subscription/components/SubscriptionBadge";

interface AppNavbarProps {
  title?: string;
}

export function AppNavbar({ title = "Dashboard" }: AppNavbarProps) {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <SubscriptionBadge subscriptionName="Free" />
        <ProfileDropdown />
      </div>
    </header>
  );
}
