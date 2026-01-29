import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import type {
  SidebarContainerProps,
  SidebarItemProps,
  SidebarProps,
  SidebarSection,
  SidebarSectionProps,
} from "@/types/sidebar.types";

export function Sidebar({ sections, className, ...props }: SidebarProps) {
  return (
    <SidebarContainer className={className} {...props}>
      {sections.map((section: any, index: number) => (
        <SidebarSection section={section} key={index} />
      ))}
    </SidebarContainer>
  );
}

function SidebarContainer({
  children,
  className,
  ...props
}: SidebarContainerProps) {
  return (
    <nav
      className={cn("flex-1 p-4 space-y-6 overflow-y-auto", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

function SidebarSection({ section, className, ...props }: SidebarSectionProps) {
  return (
    <div key={section.title} className={cn("space-y-2", className)} {...props}>
      <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {section.title}
      </h4>
      <div className="space-y-1">
        {section.items.map((link: any, index: number) => {
          return <SidebarItem key={index} link={link} />;
        })}
      </div>
    </div>
  );
}

function SidebarItem({ link, className, ...props }: SidebarItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === link.href;

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start gap-3"
      asChild
      {...props}
    >
      <Link to={link.href}>
        <link.icon size={18} />
        {link.label}
      </Link>
    </Button>
  );
}
