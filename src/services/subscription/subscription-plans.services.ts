import { supabase } from "@/lib/supabase";
import type { SubscriptionPlan } from "@/types/subscription.types";

export const SubscriptionPlansService = {
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("price");

    // Handle errors
    if (error) throw error;

    // Return as formatted subscription plans
    return data.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceId: plan.price_id,
      interval: plan.interval,
      currency: plan.currency,
      features: Array.isArray(plan.features)
        ? plan.features
        : typeof plan.features === "string"
          ? plan.features.split(",").map((f: string) => f.trim())
          : [],
      highlighted: plan.highlighted,
      paymentLink: plan.payment_link,
    })) as SubscriptionPlan[];
  },
};
