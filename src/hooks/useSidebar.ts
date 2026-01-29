import {
  BarChart3,
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  Palette,
  Users,
} from "lucide-react";

const SidebarPlatformSection = {
  title: "Platform",
  items: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    { icon: FolderOpen, label: "Projects", href: "/projects" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ],
};

const SidebarAdminSection = {
  title: "Admin",
  items: [
    { icon: Users, label: "Users", href: "/admin/users" },
    {
      icon: CreditCard,
      label: "Subscriptions",
      href: "/admin/subscriptions",
    },
    { icon: Palette, label: "Test UI", href: "/admin/test-ui" },
  ],
};

import type { SidebarSection } from "@/types/sidebar.types";
import { useMemo } from "react";
import { useRole } from "./auth/useSession";

export const useSidebar = (): SidebarSection[] => {
  const { data: role } = useRole();

  const sections = useMemo(() => {
    return role === "admin"
      ? [SidebarPlatformSection, SidebarAdminSection]
      : [SidebarPlatformSection];
  }, [role]);

  return sections;
};
