import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSessionUser } from "@/hooks/useAuth";

// ============================================================================
// Constants
// ============================================================================

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
// Hook: Fetch all users for admin dashboard
// ============================================================================

export function useAdminUsers() {
    const { admin } = useAdmin();

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
        enabled: admin === true,
        staleTime: FIVE_MINUTES,
    });
}
