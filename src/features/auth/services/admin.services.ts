import { supabase } from "@/lib/supabase";
import type { Admin, AdminUserView } from "../types/admin.types";

export const AdminServices = {
    // TODO: Improve logic without needing userId
    getAdmin: async (userId: string): Promise<Admin> => {
        const { data, error } = await supabase
            .from("admins")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) throw error;

        // If no data, return no admin
        if (!data) return false;

        // If data, return admin
        return true;
    },

    getUserList: async (): Promise<AdminUserView[]> => {
        const { data, error } = await supabase
            .from("admin_users_view")
            .select("*")
            .order("joined_at", { ascending: false });

        if (error) throw error;
        return (data as AdminUserView[]) ?? [];
    }
}