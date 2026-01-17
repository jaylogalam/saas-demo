import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSidebar } from "@/hooks/useSidebar";

interface SidebarProps {
  onItemClick?: () => void;
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const currentPath = location.pathname;
  const { sections } = useSidebar();

  return (
    <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {section.title}
          </h4>
          <div className="space-y-1">
            {section.items.map((link: any) => {
              const isActive = currentPath === link.href;
              return (
                <Button
                  key={link.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  asChild
                  onClick={onItemClick}
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
