import { supabase } from "@/lib/supabase";
import type { UserSubscription } from "@/types/subscription.types";
import type { User } from "@/types/user.types";
import camelCaseKeys from "camelcase-keys";

export const UserSubscriptionServices = {
  getUserSubscriptions: async (
    user: Pick<User, "email"> | null,
  ): Promise<UserSubscription[] | null> => {
    if (!user) return null;

    const { data } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("email", user.email)
      .order("current_period_end", { ascending: false });

    if (!data) return null;

    return data.map((subscription) =>
      camelCaseKeys(subscription, { deep: true })
    ) as UserSubscription[];
  },
};
