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
  const sizeClasses = iconSize === "sm" ? "size-6 text-sm" : "size-8 text-base";

  return (
    <Link to={to} className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold ${sizeClasses}`}
      >
        S
      </div>
      <span className="text-xl font-bold">{name}</span>
    </Link>
  );
}
