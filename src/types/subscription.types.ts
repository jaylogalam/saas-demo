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
