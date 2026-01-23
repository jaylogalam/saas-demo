import { supabase } from "@/lib/supabase";

export const SessionServices = {
  // TODO: Replace getSession to database query from users table
  getUser: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    const session = data.session;
    if (!session) return null;

    const user = session.user;
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
      avatarUrl: user.user_metadata?.avatar_url,
      createdAt: user.created_at,
      emailConfirmedAt: user.email_confirmed_at,
    };
  },

  // TODO: Improve logic without needing userId
  getAdmin: async (userId: string) => {
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
};
