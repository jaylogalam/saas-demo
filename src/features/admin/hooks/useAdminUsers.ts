import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAdmin } from "./useAdmin";

// ============================================================================
// Types
// ============================================================================

export interface AdminUser {
    user_id: string;
    email: string;
    full_name: string | null;
    joined_at: string;
    customer_id: string | null;
    subscription_id: string | null;
    subscription_status: string | null;
    product_name: string | null;
    billing_interval: string | null;
    current_period_start: number | null;
    current_period_end: number | null;
    cancel_at_period_end: boolean | null;
}

// ============================================================================
// Constants
// ============================================================================

const FIVE_MINUTES = 1000 * 60 * 5;

// ============================================================================
// Hook: Fetch all users for admin dashboard
// ============================================================================

export function useAdminUsers() {
    const { data: isAdmin } = useAdmin();

    return useQuery({
        queryKey: ["admin", "users"],
        queryFn: async (): Promise<AdminUser[]> => {
            const { data, error } = await supabase
                .from("admin_users_view")
                .select("*")
                .order("joined_at", { ascending: false });

            if (error) throw error;
            return (data as AdminUser[]) ?? [];
        },
        enabled: isAdmin === true,
        staleTime: FIVE_MINUTES,
    });
}
