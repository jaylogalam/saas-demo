/**
 * Subscription Plans Configuration (DEPRECATED)
 *
 * NOTE: This file is kept for reference only.
 * Plans are now fetched from Supabase (products + prices tables).
 *
 * To configure plans:
 * 1. Add products in Stripe Dashboard
 * 2. Add metadata to each product:
 *    - features: "Feature 1,Feature 2,Feature 3" (comma-separated)
 *    - highlighted: "true" or "false"
 *    - payment_link_monthly: "https://buy.stripe.com/..."
 *    - payment_link_yearly: "https://buy.stripe.com/..."
 * 3. Products and prices sync to Supabase via webhook
 */

import type { SubscriptionPlan } from "@/features/subscription/types/subscription.types";

// Legacy fallback plans (not used in production)
export const subscriptionPlans: SubscriptionPlan[] = [];

// Helper function kept for backwards compatibility
export const getPlanById = (id: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find((plan) => plan.id === id);
};
