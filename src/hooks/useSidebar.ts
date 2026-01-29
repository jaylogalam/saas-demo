import { useMemo } from "react";
import { useRole } from "./auth/useSession";
import { SidebarAdminSection, SidebarPlatformSection } from "@/app/sidebar";

export const useSidebar = () => {
  const { data: role } = useRole();

  const sections = useMemo(() => {
    return role === "admin"
      ? [SidebarPlatformSection, SidebarAdminSection]
      : [SidebarPlatformSection];
  }, [role]);

  return sections;
};
