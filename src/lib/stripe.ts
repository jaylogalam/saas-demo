import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn(
    "Missing VITE_STRIPE_PUBLISHABLE_KEY environment variable. Stripe features will be limited."
  );
}

// Load Stripe.js - returns a Promise that resolves to the Stripe object
export const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

// Stripe configuration
export const stripeConfig = {
  publishableKey: stripePublishableKey,
} as const;
