/**
 * Stripe Sync Engine Database Types
 * Types matching the `stripe` schema created by Supabase Stripe Sync Engine
 */

// Stripe Customer from stripe.customers
export interface StripeCustomer {
  id: string;
  email: string | null;
  name: string | null;
  metadata: Record<string, string> | null;
  created: number;
}

// Stripe Product from stripe.products
export interface StripeProduct {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  images: string[] | null;
  metadata: {
    features?: string;
    highlighted?: string;
    payment_link_monthly?: string;
    payment_link_yearly?: string;
  } | null;
}

// Stripe Price from stripe.prices
export interface StripePrice {
  id: string;
  product: string; // Product ID reference
  active: boolean;
  unit_amount: number | null;
  currency: string;
  type: "one_time" | "recurring";
  recurring: {
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
  } | null;
  metadata: Record<string, string> | null;
}

// Stripe Subscription from stripe.subscriptions
export interface StripeSubscription {
  id: string;
  customer: string; // Customer ID reference
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "paused"
    | "trialing"
    | "unpaid";
  items: {
    data: Array<{
      price: {
        id: string;
        product: string;
        recurring: {
          interval: "day" | "week" | "month" | "year";
        } | null;
      };
    }>;
  };
  current_period_end: number;
  current_period_start: number;
  cancel_at_period_end: boolean;
  created: number;
}
