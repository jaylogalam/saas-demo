import {
  BarChart3,
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  Palette,
  Users,
} from "lucide-react";

export const SidebarPlatformSection = {
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

export const SidebarAdminSection = {
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
