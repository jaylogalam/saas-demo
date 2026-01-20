import { AppLogo } from "../../components/icons/AppLogo";
import { Sidebar } from "./Sidebar";
import type { SidebarSection } from "./sidebar.types";

interface DesktopSidebarProps {
  sections: SidebarSection[];
}

export function DesktopSidebar({ sections }: DesktopSidebarProps) {
  return (
    <aside className="w-64 border-r bg-muted/30 hidden lg:flex lg:flex-col">
      <div className="p-6">
        <AppLogo />
      </div>

      <Sidebar sections={sections} />
    </aside>
  );
}
