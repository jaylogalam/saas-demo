import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

type SidebarProps = {
  sections: SidebarSection[];
} & React.ComponentPropsWithoutRef<"nav">;

type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

function Sidebar({ sections, ...props }: SidebarProps) {
  return (
    <nav className="flex-1 p-4 space-y-6 overflow-y-auto" {...props}>
      {sections.map((section: SidebarSection) => (
        <div key={section.title} className="space-y-2">
          <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {section.title}
          </h4>
          <div className="space-y-1">
            {section.items.map((link: SidebarItem) => {
              const { pathname } = useLocation();
              const isActive = pathname === link.href;

              return (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link to={link.href}>
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
