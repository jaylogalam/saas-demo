import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryKeys } from "@/lib/queryKeys";
import type { UserSubscription } from "../types";

/**
 * Fetch the current user's subscription via email-based customer lookup
 */

export const useUserSubscriptionQueryOptions = (userEmail: string) => {
  return queryOptions({
    queryKey: queryKeys.subscription.user(userEmail),
    queryFn: async (): Promise<UserSubscription[] | null> => {
      const { data } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("customer_email", userEmail)
        .order("price", { ascending: false });
      if (!data) return null;

      return data as UserSubscription[];
    },
    staleTime: 1000 * 60 * 5,
  });
};
