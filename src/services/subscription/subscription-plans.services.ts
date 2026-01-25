import { supabase } from "@/lib/supabase";
import { toCamelCase } from "@/utils/caseTransform";
import type { SubscriptionPlan } from "@/types/subscription.types";

export const SubscriptionPlansService = {
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("name");

    if (error) throw error;

    return toCamelCase<SubscriptionPlan[]>(data);
  },
};
