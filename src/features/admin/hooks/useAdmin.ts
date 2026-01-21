import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSessionUser } from "@/hooks/useAuth";

const FIVE_MINUTES = 1000 * 60 * 5;

/**
 * Hook: Check if current user is admin
 */
export function useAdmin() {
    const user = useSessionUser();

    const { data: admin, isLoading: adminLoading } = useQuery({
        queryKey: ["admin", "is-admin", user?.id],
        queryFn: async (): Promise<boolean> => {
            if (!user?.id) return false;

            const { data, error } = await supabase
                .from("admins")
                .select("id")
                .eq("user_id", user.id)
                .single();

            if (error || !data) return false;
            return true;
        },
        enabled: !!user?.id,
        staleTime: FIVE_MINUTES,
    });

    return { admin, adminLoading };
}
