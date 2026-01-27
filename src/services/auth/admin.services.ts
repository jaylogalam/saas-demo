import { supabase } from "@/lib/supabase";
import camelcaseKeys from "camelcase-keys";
import type { User } from "@/types/user.types";

export const AdminServices = {
    // TODO: Move getUserList function to UserServices
    getUserList: async (): Promise<User[] | null> => {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data.map((user: any) =>
            camelcaseKeys(user, { deep: true })
        ) as User[];
    },
};
