import { supabase } from "@/lib/supabase";

export const SessionServices = {
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
};
