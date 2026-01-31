import { supabase } from "@/lib/supabase";
import type { UserSubscription } from "@/types/subscription.types";
import type { User } from "@/types/user.types";
import camelCaseKeys from "camelcase-keys";

export const UserSubscriptionServices = {
  getUserSubscriptions: async (
    user: Pick<User, "email"> | null,
  ): Promise<UserSubscription | null> => {
    if (!user) return null;

    const { data } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("email", user.email)
      .order("current_period_end", { ascending: false })
      .limit(1)
      .single();

    if (!data) return null;

    return camelCaseKeys(data, { deep: true }) as UserSubscription;
  },

  listAllUserSubscriptions: async (): Promise<UserSubscription[] | null> => {
    const { data } = await supabase
      .from("user_subscriptions")
      .select("*")
      .order("current_period_end", { ascending: false });

    if (!data) return null;

    return data.map((subscription) =>
      camelCaseKeys(subscription, { deep: true })
    ) as UserSubscription[];
  },

  cancelUserSubscription: async (subscriptionId: string) => {
    const { data, error } = await supabase.functions.invoke(
      "cancel-subscription",
      { body: { subscription_id: subscriptionId } },
    );

    if (error) {
      const errorMsg = await error.context.json();
      console.log("Detailed Error:", errorMsg);
    }
    if (data) console.log(data);

    return data;
  },
};
