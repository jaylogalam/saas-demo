import { Link } from "react-router-dom";

interface AppLogoProps {
  to?: string;
  name?: string;
  iconSize?: "sm" | "md";
}

export function AppLogo({
  to = "/",
  name = "SaaS Demo",
  iconSize = "md",
}: AppLogoProps) {
  const sizeClasses = iconSize === "sm" ? "size-6" : "size-8";

  return (
    <Link
      to={to}
      className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
    >
      <img src="/logo.svg" alt="Logo" className={sizeClasses} />
      <span className="text-xl font-bold tracking-tight whitespace-nowrap">
        {name}
      </span>
    </Link>
  );
}
