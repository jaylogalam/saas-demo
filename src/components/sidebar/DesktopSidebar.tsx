import { cn } from "@/utils/cn";
import { Sidebar } from "./Sidebar";
import type {
  DesktopSidebarContentProps,
  DesktopSidebarHeaderProps,
  DesktopSidebarProps,
} from "@/types/sidebar.types";

export function DesktopSidebar({
  children,
  className,
  ...props
}: DesktopSidebarProps) {
  return (
    <aside
      className={cn(
        "w-64 border-r bg-muted/30 hidden lg:flex lg:flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function DesktopSidebarHeader({
  children,
  className,
  ...props
}: DesktopSidebarHeaderProps) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function DesktopSidebarContent({
  sections,
  className,
  ...props
}: DesktopSidebarContentProps) {
  return <Sidebar sections={sections} className={className} {...props} />;
}
