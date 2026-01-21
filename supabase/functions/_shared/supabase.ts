import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Use this to check "Who is calling?"
export const getUserClient = (req: Request) => {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: req.headers.get("Authorization")! } },
    auth: { persistSession: false },
  });
};

// Use this to "Do the work" (Bypass RLS safely)
export const getAdminClient = () => {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
};
