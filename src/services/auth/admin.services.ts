import { supabase } from "@/lib/supabase";
import type { Admin, AdminUserView } from "../../types/admin.types";
import type { User } from "@/types/user.types";

export const AdminServices = {
    // TODO: Improve logic without needing userId
    getAdmin: async (user: Pick<User, "id"> | null): Promise<Admin> => {
        if (!user) return false;

        const { data, error } = await supabase
            .from("admins")
            .select("*")
            .eq("user_id", user.id)
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
    },
};
