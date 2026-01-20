import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionBadgeProps {
  subscriptionName: string;
  isLoading?: boolean;
}

export function SubscriptionBadge({
  subscriptionName,
  isLoading = false,
}: SubscriptionBadgeProps) {
  if (isLoading) return <Skeleton className={`h-5 w-16`} />;

  return (
    <span
      className={`rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground`}
    >
      {subscriptionName}
    </span>
  );
}
