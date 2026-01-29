import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { AppLogo } from "@/components/icons/AppLogo";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

type MobileSidebarState = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

type MobileSidebarProps = {
  sections: Parameters<typeof Sidebar>[0]["sections"];
};

const useMobileSidebarStore = create<MobileSidebarState>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

function MobileSidebar({ sections }: MobileSidebarProps) {
  const isOpen = useMobileSidebarStore((state) => state.isOpen);
  const close = useMobileSidebarStore((state) => state.close);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={close} />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r bg-background transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <AppLogo />
          <Button variant="ghost" size="icon" onClick={close}>
            <X size={20} />
          </Button>
        </div>

        <Sidebar sections={sections} />
      </aside>
    </>
  );
}

export function MobileSidebarToggler() {
  const open = useMobileSidebarStore((state) => state.open);

  return (
    <Button variant="ghost" size="icon" onClick={open}>
      <Menu size={20} />
    </Button>
  );
}

export default MobileSidebar;
