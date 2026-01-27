import { supabase } from "@/lib/supabase";
import type { User } from "@/types/user.types";
import camelcaseKeys from "camelcase-keys";

export const UserServices = {
  getUser: async (): Promise<User | null> => {
    const { data } = await supabase
      .from("users")
      .select()
      .single();

    if (!data) return null;

    return camelcaseKeys(data, { deep: true }) as User;
  },
};
