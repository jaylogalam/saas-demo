import { supabase } from "@/lib/supabase";
import type { UserSubscription } from "../types";
import type { User } from "@/features/auth/types/user.types";

export const UserSubscriptionServices = {
  getUserSubscription: async (
    user: Pick<User, "email"> | null,
  ): Promise<UserSubscription | null> => {
    if (!user) return null;

    const { data } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("customer_email", user.email)
      .eq("active", true)
      .order("price", { ascending: false })
      .limit(1);
    if (!data) return null;

    return data[0] as UserSubscription;
  },
};
