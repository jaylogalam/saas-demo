import { queryKeys } from "@/lib/queryKeys";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export const useSessionQueryOptions = () => {
    return queryOptions({
        queryKey: queryKeys.auth.session(),
        queryFn: async (): Promise<Session | null> => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (!session) return null;
            return session;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
