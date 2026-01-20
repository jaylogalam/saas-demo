import { Button } from "../../components/ui/button";
import { AppLogo } from "../../components/icons/AppLogo";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import type { SidebarSection } from "./sidebar.types";

interface MobileSidebarProps {
  sections: SidebarSection[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({
  sections,
  isOpen,
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

      {/* Sidebar Navigation */}
      <Sidebar sections={sections} onItemClick={onClose} />
    </aside>
  );
}
