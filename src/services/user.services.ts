import { supabase } from "@/lib/supabase";
import camelcaseKeys from "camelcase-keys";
import { SessionServices } from "./session.services";
import type { User } from "@/types/user.types";

export const UserServices = {
  getUser: async (): Promise<User | null> => {
    // TODO: Optimize getUser function for admins
    const role = await SessionServices.getRole();

    if (role === "admin") {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error) throw error;

      if (!data) return null;

      return camelcaseKeys(data, { deep: true }) as User;
    }

    const { data, error } = await supabase
      .from("users")
      .select()
      .single();

    if (error) return null;

    if (!data) return null;

    return camelcaseKeys(data, { deep: true }) as User;
  },

  listUsers: async (): Promise<User[] | null> => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data) return null;

    return camelcaseKeys(data, { deep: true }) as User[];
  },
};
