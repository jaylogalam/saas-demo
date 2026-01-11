import { create } from "zustand";
import type {
  BillingInterval,
  CustomerSubscription,
} from "@/types/subscription.types";

interface SubscriptionState {
  // Current user subscription (null if free tier)
  subscription: CustomerSubscription | null;

  // UI state
  billingInterval: BillingInterval;
  loading: boolean;
  error: string | null;

  // Actions
  setBillingInterval: (interval: BillingInterval) => void;
  setSubscription: (subscription: CustomerSubscription | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  billingInterval: "monthly",
  loading: false,
  error: null,

  setBillingInterval: (interval) => set({ billingInterval: interval }),
  setSubscription: (subscription) => set({ subscription }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
