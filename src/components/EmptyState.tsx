import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: LucideIcon;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  const ActionIcon = action?.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <Icon className="size-8 text-primary" />
      </div>
      <h2 className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mb-6 max-w-sm text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
      {action &&
        (action.href ? (
          <Button asChild size="lg">
            <Link to={action.href}>
              {action.label}
              {ActionIcon && <ActionIcon className="ml-1 size-4" />}
            </Link>
          </Button>
        ) : (
          <Button size="lg" onClick={action.onClick}>
            {action.label}
            {ActionIcon && <ActionIcon className="ml-1 size-4" />}
          </Button>
        ))}
    </div>
  );
}
