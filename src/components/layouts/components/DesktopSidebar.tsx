import { AppLogo } from "../../icons/AppLogo";
import Sidebar from "./Sidebar";

type DesktopSidebarProps = {
  sections: Parameters<typeof Sidebar>[0]["sections"];
};

function DesktopSidebar({ sections }: DesktopSidebarProps) {
  return (
    <aside className="w-64 border-r bg-muted/30 hidden lg:flex lg:flex-col">
      <div className="p-6">
        <AppLogo />
      </div>

      <Sidebar sections={sections} />
    </aside>
  );
}

export default DesktopSidebar;
