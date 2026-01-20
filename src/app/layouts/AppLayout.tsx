import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/features/profile/components/ProfileDropdown";
import { SubscriptionBadge } from "@/features/subscription/components/SubscriptionBadge";
import { DesktopSidebar } from "../sidebars/DesktopSidebar";
import { MobileSidebar } from "../sidebars/MobileSidebar";

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        />
      ) : null}

      <DesktopSidebar />
      <MobileSidebar isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 sm:h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </Button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2 sm:gap-3">
            <SubscriptionBadge subscriptionName="Free" />
            <ProfileDropdown showNavItems={true} />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
