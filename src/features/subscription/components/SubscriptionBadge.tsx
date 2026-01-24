import type { UserSubscription } from "../types";
  
type SubscriptionBadgeProps = {
  subscription: Pick<UserSubscription, "name"> | null;
};

export function SubscriptionBadge({ subscription }: SubscriptionBadgeProps) {
  if (!subscription) return null;

  return (
    <span
      className={`rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground`}
    >
      {subscription.name}
    </span>
  );
}
