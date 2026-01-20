import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { useMobileSidebarStore } from "./storeMobileSidebar";
import { cn } from "@/utils/cn";
import type {
  MobileSidebarContentProps,
  MobileSidebarHeaderProps,
  MobileSidebarOverlayProps,
  MobileSidebarProps,
  MobileSidebarTogglerProps,
} from "./sidebar.types";

export function MobileSidebar({ children, ...props }: MobileSidebarProps) {
  const isOpen = useMobileSidebarStore((state) => state.isOpen);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r bg-background transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function MobileSidebarHeader({
  children,
  className,
  ...props
}: MobileSidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-b",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function MobileSidebarContent({
  sections,
  className,
  ...props
}: MobileSidebarContentProps) {
  const close = useMobileSidebarStore((state) => state.close);
  return (
    <Sidebar
      sections={sections}
      className={className}
      onClick={close}
      {...props}
    />
  );
}

export function MobileSidebarToggler({
  className,
  ...props
}: MobileSidebarTogglerProps) {
  const toggle = useMobileSidebarStore((state) => state.toggle);
  return (
    <Button
      className={className}
      variant="ghost"
      size="icon"
      onClick={toggle}
      {...props}
    />
  );
}

export function MobileSidebarOverlay({
  className,
  ...props
}: MobileSidebarOverlayProps) {
  const isOpen = useMobileSidebarStore((state) => state.isOpen);
  const close = useMobileSidebarStore((state) => state.close);
  if (!isOpen) return null;
  return (
    <div
      className={cn("fixed inset-0 z-40 bg-black/50", className)}
      onClick={close}
      {...props}
    />
  );
}
