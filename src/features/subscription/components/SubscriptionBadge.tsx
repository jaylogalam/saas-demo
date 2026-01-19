import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserSubscription } from "@/features/subscription/hooks";
import { formatUnixTimestamp } from "@/utils/formatDate";
import type { SubscriptionStatus } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionBadgeProps {
  variant?: "compact" | "detailed";
  className?: string;
}

export function SubscriptionBadge({
  variant = "detailed",
  className = "",
}: SubscriptionBadgeProps) {
  const { userSubscription, userSubscriptionStatus } = useUserSubscription();

  if (userSubscriptionStatus === "pending")
    return <Skeleton className={`h-5 w-16 ${className}`} />;

  if (!userSubscription) return null;

  const statusColor = getStatusColor(userSubscription.status);
  const statusLabel = getStatusLabel(userSubscription.status);

  if (variant === "compact") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={`rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground ${className}`}
            >
              {userSubscription.name}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {statusLabel} • Renews{" "}
              {formatUnixTimestamp(userSubscription.currentPeriodEnd)}
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
            {userSubscription.name}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {statusLabel} •{" "}
            {userSubscription.status === "canceled"
              ? `Expires ${formatUnixTimestamp(
                  userSubscription.currentPeriodEnd,
                )}`
              : `Renews ${formatUnixTimestamp(
                  userSubscription.currentPeriodEnd,
                )}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function getStatusColor(status: SubscriptionStatus): string {
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

function getStatusLabel(status: SubscriptionStatus): string {
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
