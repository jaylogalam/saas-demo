// src/store/useAuthStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "@/types/user.types";

interface UserState {
  user: User | null;
  userLoading: boolean;
  setUser: (user: SupabaseUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userLoading: true,
  setUser: (user) =>
    set({
      user: user
        ? ({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name as string,
          avatar_url: user.user_metadata?.avatar_url as string,
          created_at: user.created_at as string,
          email_confirmed_at: user.email_confirmed_at as string,
        } as User)
        : null,
      userLoading: false,
    }),
}));

// External Listener: Runs once on module load
// This replaces the useEffect block found in the quickstart
supabase.auth.onAuthStateChange((_event, session) => {
  useUserStore.getState().setUser(session?.user ?? null);
});
