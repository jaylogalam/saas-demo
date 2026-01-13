import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, FolderOpen, BarChart3, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/AppLogo";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { useAuthStore } from "@/store/authStore";
import { useSignOut } from "@/hooks/useAuth";

const sidebarSections = [
  {
    title: "Platform",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: FolderOpen, label: "Projects", href: "/projects" },
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
    ],
  },
];

export function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuthStore();
  const signOutMutation = useSignOut();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userInfo = user
    ? {
        name:
          user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : undefined;

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r bg-muted/30 hidden lg:flex lg:flex-col">
        {/* Logo */}
        <div className="p-6">
          <AppLogo />
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {sidebarSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Button
                      key={link.href}
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <Link to={link.href}>
                        <link.icon size={18} />
                        {link.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-background transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <AppLogo />
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMobileMenu}
            className="lg:hidden"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {sidebarSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Button
                      key={link.href}
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      asChild
                      onClick={closeMobileMenu}
                    >
                      <Link to={link.href}>
                        <link.icon size={18} />
                        {link.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 sm:h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </Button>

          {/* Desktop spacer */}
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2 sm:gap-3">
            <SubscriptionBadge variant="compact" />
            <ProfileDropdown
              user={userInfo}
              onLogout={handleLogout}
              showNavItems={true}
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
