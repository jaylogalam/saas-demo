// Subscription plan definition
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  priceIds: {
    monthly: string;
    yearly: string;
  };
  currency: string;
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

// Proration preview from Stripe
export interface ProrationPreview {
  immediateAmount: number; // Amount to charge immediately (cents)
  credit: number; // Credit from unused time (cents)
  newPlanCost: number; // New plan cost for remainder (cents)
  effectiveDate: string; // When change takes effect
  isUpgrade: boolean;
  currency: string;
}

// Plan change request
export interface PlanChangeRequest {
  subscriptionId: string;
  newPriceId: string;
}
