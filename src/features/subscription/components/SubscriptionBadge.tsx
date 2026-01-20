interface SubscriptionBadgeProps {
  subscriptionName: string | null;
  isLoading?: boolean;
}

export function SubscriptionBadge({
  subscriptionName,
}: SubscriptionBadgeProps) {
  if (!subscriptionName) return null;

  return (
    <span
      className={`rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground`}
    >
      {subscriptionName}
    </span>
  );
}
