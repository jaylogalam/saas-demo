import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import type { SupabaseSubscription } from "@/types/database.types";

interface SubscriptionBadgeProps {
  variant?: "compact" | "detailed";
  className?: string;
}

function getStatusColor(status: SupabaseSubscription["status"]): string {
  switch (status) {
    case "active":
      return "bg-emerald-500";
    case "trialing":
      return "bg-amber-500";
    case "past_due":
    case "unpaid":
      return "bg-red-500";
    case "canceled":
    case "paused":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
}

function getStatusLabel(status: SupabaseSubscription["status"]): string {
  switch (status) {
    case "active":
      return "Active";
    case "trialing":
      return "Trial";
    case "past_due":
      return "Past Due";
    case "unpaid":
      return "Unpaid";
    case "canceled":
      return "Canceled";
    case "paused":
      return "Paused";
    default:
      return status;
  }
}

function formatDate(timestamp: number): string {
  // Stripe timestamps are in seconds, JS Date expects milliseconds
  return new Date(timestamp * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function SubscriptionBadge({
  variant = "detailed",
  className = "",
}: SubscriptionBadgeProps) {
  const { data, isLoading } = useUserSubscription();

  if (isLoading) {
    return (
      <div
        className={`h-5 w-16 animate-pulse rounded-full bg-muted ${className}`}
      />
    );
  }

  if (!data) {
    return (
      <Badge
        variant="secondary"
        className={`text-xs font-normal text-muted-foreground ${className}`}
      >
        Free
      </Badge>
    );
  }

  const { subscription, productName } = data;
  const statusColor = getStatusColor(subscription.status);
  const statusLabel = getStatusLabel(subscription.status);

  if (variant === "compact") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={`rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground ${className}`}
            >
              {productName}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {statusLabel} • Renews{" "}
              {formatDate(subscription.current_period_end)}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className={`gap-1.5 text-xs font-medium transition-colors hover:bg-secondary/80 ${className}`}
          >
            <span className={`size-1.5 rounded-full ${statusColor}`} />
            <Sparkles className="size-3" />
            {productName}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {statusLabel} •{" "}
            {subscription.status === "canceled"
              ? `Expires ${formatDate(subscription.current_period_end)}`
              : `Renews ${formatDate(subscription.current_period_end)}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
