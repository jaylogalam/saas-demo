import { create } from "zustand";

interface SubscriptionState {
  billingInterval: "monthly" | "yearly";
  loading: boolean;
  error: string | null;
  setBillingInterval: (interval: "monthly" | "yearly") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  billingInterval: "monthly",
  loading: false,
  error: null,
  setBillingInterval: (interval) => set({ billingInterval: interval }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
