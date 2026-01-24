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
import { useUser } from "./auth/useUser";
import { useAdmin } from "./auth/useAdmin";

export const useSidebar = (): SidebarSection[] => {
  const { data: user } = useUser();
  const { data: admin } = useAdmin(user);
  const sections = useMemo(() => {
    return admin
      ? [SidebarPlatformSection, SidebarAdminSection]
      : [SidebarPlatformSection];
  }, [admin]);

  return sections;
};
