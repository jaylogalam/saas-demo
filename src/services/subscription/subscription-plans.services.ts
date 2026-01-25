import { supabase } from "@/lib/supabase";
import type { SubscriptionPlan } from "@/types/subscription.types";

export const SubscriptionPlansService = {
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("name");

    // Handle errors
    if (error) throw error;

    // Return as formatted subscription plans
    return data as SubscriptionPlan[];
  },
};
