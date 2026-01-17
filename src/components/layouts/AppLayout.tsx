import { useMemo, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Menu,
  X,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/AppLogo";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useSignOut } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useAdminUsers";

// ============================================================================
// Types
// ============================================================================

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// ============================================================================
// Constants
// ============================================================================

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Platform",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: FolderOpen, label: "Projects", href: "/projects" },
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
    ],
  },
];

// ============================================================================
// Sidebar Navigation Component (Single Responsibility)
// ============================================================================

interface SidebarNavProps {
  sections: SidebarSection[];
  currentPath: string;
  onItemClick?: () => void;
}

function SidebarNav({ sections, currentPath, onItemClick }: SidebarNavProps) {
  return (
    <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {section.title}
          </h4>
          <div className="space-y-1">
            {section.items.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Button
                  key={link.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  asChild
                  onClick={onItemClick}
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
  );
}

// ============================================================================
// Mobile Overlay Component
// ============================================================================

interface MobileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileOverlay({ isOpen, onClose }: MobileOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      onClick={onClose}
    />
  );
}

// ============================================================================
// Desktop Sidebar Component
// ============================================================================

interface DesktopSidebarProps {
  currentPath: string;
  sections: SidebarSection[];
}

function DesktopSidebar({ currentPath, sections }: DesktopSidebarProps) {
  return (
    <aside className="w-64 border-r bg-muted/30 hidden lg:flex lg:flex-col">
      <div className="p-6">
        <AppLogo />
      </div>
      <SidebarNav sections={sections} currentPath={currentPath} />
    </aside>
  );
}

// ============================================================================
// Mobile Sidebar Component
// ============================================================================

interface MobileSidebarProps {
  isOpen: boolean;
  currentPath: string;
  sections: SidebarSection[];
  onClose: () => void;
}

function MobileSidebar({
  isOpen,
  currentPath,
  sections,
  onClose,
}: MobileSidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-background transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <AppLogo />
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:hidden"
        >
          <X size={20} />
        </Button>
      </div>
      <SidebarNav
        sections={sections}
        currentPath={currentPath}
        onItemClick={onClose}
      />
    </aside>
  );
}

// ============================================================================
// Top Header Component
// ============================================================================

interface TopHeaderProps {
  userInfo?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onMenuClick: () => void;
  onLogout: () => void;
}

function TopHeader({ userInfo, onMenuClick, onLogout }: TopHeaderProps) {
  return (
    <header className="h-14 sm:h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </Button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-3">
        <SubscriptionBadge variant="compact" />
        <ProfileDropdown
          user={userInfo}
          onLogout={onLogout}
          showNavItems={true}
        />
      </div>
    </header>
  );
}

// ============================================================================
// Main Dashboard Layout Component
// ============================================================================

export function AppLayout() {
  const location = useLocation();
  const { userInfo } = useUserInfo();
  const signOutMutation = useSignOut();
  const { data: isAdmin } = useIsAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Build sidebar sections dynamically based on admin status
  const sidebarSections = useMemo(() => {
    const sections = [...SIDEBAR_SECTIONS];
    if (isAdmin) {
      sections.push({
        title: "Admin",
        items: [{ icon: Shield, label: "Admin", href: "/admin" }],
      });
    }
    return sections;
  }, [isAdmin]);

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <MobileOverlay isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <DesktopSidebar
        currentPath={location.pathname}
        sections={sidebarSections}
      />
      <MobileSidebar
        isOpen={mobileMenuOpen}
        currentPath={location.pathname}
        sections={sidebarSections}
        onClose={closeMobileMenu}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader
          userInfo={userInfo}
          onMenuClick={() => setMobileMenuOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
