import type { SubscriptionPlan } from "@/types/subscription.types";

/**
 * Subscription Plans Configuration
 *
 * IMPORTANT: Replace the paymentLinks with your actual Stripe Payment Links.
 * You can create Payment Links in the Stripe Dashboard:
 * https://dashboard.stripe.com/payment-links
 *
 * For each plan, create two Payment Links:
 * 1. Monthly billing
 * 2. Yearly billing (with discount)
 */
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: {
      monthly: 9,
      yearly: 90, // ~17% discount
    },
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Email support",
      "1 GB storage",
      "API access",
    ],
    paymentLinks: {
      monthly: "https://buy.stripe.com/test_XXXXXX", // Replace with actual link
      yearly: "https://buy.stripe.com/test_YYYYYY", // Replace with actual link
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing teams and businesses",
    price: {
      monthly: 29,
      yearly: 290, // ~17% discount
    },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10 GB storage",
      "API access",
      "Team collaboration",
      "Custom integrations",
    ],
    highlighted: true,
    paymentLinks: {
      monthly: "https://buy.stripe.com/test_ZZZZZZ", // Replace with actual link
      yearly: "https://buy.stripe.com/test_AAAAAA", // Replace with actual link
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: {
      monthly: 99,
      yearly: 990, // ~17% discount
    },
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 phone support",
      "SLA guarantee",
      "Custom contracts",
      "Dedicated account manager",
      "On-premise deployment",
      "SSO & SAML",
    ],
    paymentLinks: {
      monthly: "https://buy.stripe.com/test_BBBBBB", // Replace with actual link
      yearly: "https://buy.stripe.com/test_CCCCCC", // Replace with actual link
    },
  },
];

// Get a plan by ID
export const getPlanById = (id: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find((plan) => plan.id === id);
};
