import { supabase } from "@/lib/supabase";
import type { SubscriptionPlan } from "@/types/subscription.types";
import camelCaseKeys from "camelcase-keys";

export const SubscriptionPlansService = {
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("price");

    if (error) throw error;

    return data.map((plan: any) => {
      const converted = camelCaseKeys(plan, { deep: true });
      return {
        ...converted,
        features: Array.isArray(converted.features)
          ? converted.features
          : typeof converted.features === "string"
          ? converted.features.split(",").map((f: string) => f.trim())
          : [],
      };
    }) as SubscriptionPlan[];
  },
};
