import { supabase } from "@/lib/supabase";
import type { AdminUserView } from "../../types/admin.types";
import camelcaseKeys from "camelcase-keys";

export const AdminServices = {
    getUserList: async (): Promise<AdminUserView[]> => {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data.map((user: any) =>
            camelcaseKeys(user, { deep: true })
        ) as AdminUserView[];
    },
};
