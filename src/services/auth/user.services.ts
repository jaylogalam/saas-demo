import { supabase } from "@/lib/supabase";
import type { User } from "@/types/user.types";
import camelcaseKeys from "camelcase-keys";

export const UserServices = {
  // TODO: Replace getSession to database query from users table
  getUser: async (): Promise<User | null> => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .single();
    if (error) throw error;

    return camelcaseKeys(data, { deep: true }) as User;
  },
};
