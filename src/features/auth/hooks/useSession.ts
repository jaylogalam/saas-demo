import { queryKeys } from "@/lib/queryKeys";
import { queryOptions } from "@tanstack/react-query";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

export const useSessionQueryOptions = (supabaseClient: SupabaseClient) => {
    return queryOptions({
        queryKey: queryKeys.auth.session(),
        queryFn: async (): Promise<Session | null> => {
            const {
                data: { session },
            } = await supabaseClient.auth.getSession();
            if (!session) return null;
            return session;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
