// Subscription plan definition
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  highlighted?: boolean;
  paymentLinks: {
    monthly: string;
    yearly: string;
  };
}

// Subscription status from Stripe
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "paused"
  | "trialing"
  | "unpaid";

// Customer subscription data
export interface CustomerSubscription {
  id: string;
  status: SubscriptionStatus;
  planId: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

// Billing interval
export type BillingInterval = "monthly" | "yearly";
