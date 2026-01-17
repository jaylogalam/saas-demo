import { AppLogo } from "../icons/AppLogo";
import { Sidebar } from "./Sidebar";

export function DesktopSidebar() {
  return (
    <aside className="w-64 border-r bg-muted/30 hidden lg:flex lg:flex-col">
      <div className="p-6">
        <AppLogo />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />
    </aside>
  );
}
