import { cn } from "@/utils/cn";
import type {
  NavbarLinkItemProps,
  NavbarLinkListProps,
  NavbarProps,
} from "./navbar.types";

export function Navbar({ children, className }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className={cn(
          "container mx-auto flex h-16 items-center justify-between px-4",
          className,
        )}
      >
        {children}
      </nav>
    </header>
  );
}

export function NavbarLinkList({ children, className }: NavbarLinkListProps) {
  return (
    <div
      className={cn("hidden md:flex w-full items-center gap-8 ml-8", className)}
    >
      {children}
    </div>
  );
}

export function NavbarLinkItem({
  to,
  className,
  children,
}: NavbarLinkItemProps) {
  return (
    <a
      href={to}
      className={cn(
        "text-base font-medium text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      {children}
    </a>
  );
}
