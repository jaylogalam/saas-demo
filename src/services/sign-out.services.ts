import { supabase } from "@/lib/supabase";

export const SignOutServices = {
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
