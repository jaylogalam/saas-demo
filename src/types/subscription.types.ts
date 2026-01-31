export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  highlighted: boolean;
  interval: "monthly" | "yearly";
  price: number;
  currency: string;
  paymentLink: string;
}

export interface UserSubscription {
  subscriptionId: string;
  userId: string;
  email: string;
  plan: SubscriptionPlan;
  status:
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "unpaid"
    | "paused";
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}
