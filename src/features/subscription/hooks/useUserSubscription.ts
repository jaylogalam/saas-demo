import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import { useUserStore } from "@/store/userStore";
import type { UserSubscription } from "../types";

// TODO: Refactor as setting or custom hook and use it at shared hooks folder

/**
 * Fetch the current user's subscription via email-based customer lookup
 *
 * This hook queries the Stripe sync engine tables to find:
 * 1. The Stripe customer matching the user's email
 * 2. Any active/trialing subscription for that customer
 * 3. The product name for display
 */

export function useUserSubscription() {
  const { user } = useUserStore();

  const {
    data: userSubscription,
    status: userSubscriptionStatus,
    refetch: refetchUserSubscription,
  } = useSuspenseQuery({
    queryKey: queryKeys.subscription.user(user?.id),
    queryFn: async (): Promise<UserSubscription[] | null> => {
      if (!user?.email) return null;

      // Get User Subscription
      const email = user.email;
      const { data } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("customer_email", email)
        .order("price", { ascending: false });
      if (!data) return null;

      console.log(data);

      return data as UserSubscription[];
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    userSubscription,
    userSubscriptionStatus,
    refetchUserSubscription,
  };
}
