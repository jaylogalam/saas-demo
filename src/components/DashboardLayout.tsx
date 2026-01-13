import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
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
  {
    title: "Settings",
    items: [
      { icon: User, label: "Profile", href: "/profile" },
      { icon: CreditCard, label: "Billing", href: "/billing" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
];

export function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuthStore();
  const signOutMutation = useSignOut();

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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Full Height */}
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

        {/* Bottom Section - Logout Only */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-background flex items-center justify-end px-6">
          <div className="flex items-center gap-3">
            <SubscriptionBadge variant="compact" />
            <ProfileDropdown
              user={userInfo}
              onLogout={handleLogout}
              showNavItems={false}
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
