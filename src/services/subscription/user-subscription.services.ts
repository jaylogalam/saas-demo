import { supabase } from "@/lib/supabase";
import type { UserSubscription } from "@/types/subscription.types";
import type { User } from "@/types/user.types";

export const UserSubscriptionServices = {
  getUserSubscription: async (
    user: Pick<User, "email"> | null,
  ): Promise<UserSubscription | null> => {
    if (!user) return null;

    const { data } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("customer_email", user.email)
      .eq("status", "active")
      .order("price", { ascending: false })
      .limit(1);
    if (!data) return null;

    return data[0] as UserSubscription;
  },
};
