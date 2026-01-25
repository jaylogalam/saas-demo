import { supabase } from "@/lib/supabase";
import type { SubscriptionPlan } from "@/types/subscription.types";

export const SubscriptionPlansService = {
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .order("monthly_price");

    // Handle errors
    if (error) throw error;

    // Return as formatted subscription plans
    return data.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: {
        monthly: plan.monthly_price,
        yearly: plan.yearly_price,
      },
      priceIds: {
        monthly: plan.monthly_price_id,
        yearly: plan.yearly_price_id,
      },
      currency: plan.currency,
      features: plan.features,
      highlighted: plan.highlighted,
      paymentLinks: {
        monthly: plan.monthly_payment_link,
        yearly: plan.yearly_payment_link,
      },
    })) as SubscriptionPlan[];
  },
};
