import type { StripeSubscription } from "@/types/stripe.types";

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

export interface UserSubscription {
  // Product details
  name: string;
  description: string;
  features: string[];

  // Price details
  price: string;
  currency: string;
  interval: "monthly" | "yearly";

  // Subscription details
  id: string;
  status:
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "unpaid"
    | "paused";
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
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

export interface UserSubscription {
  subscription: StripeSubscription;
  productName: string;
  priceInterval: "day" | "week" | "month" | "year" | null;
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
