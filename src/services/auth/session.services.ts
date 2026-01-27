import { supabase } from "@/lib/supabase";
import { jwtDecode, type JwtPayload } from "jwt-decode";

export const SessionServices = {
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    if (!data.session) return null;
    return data.session;
  },

  getRole: async () => {
    const session = await SessionServices.getSession();
    if (!session) return null;

    const jwt: JwtPayload & { user_role: string } = jwtDecode(
      session.access_token,
    );
    const role = jwt.user_role;

    return role;
  },
};
