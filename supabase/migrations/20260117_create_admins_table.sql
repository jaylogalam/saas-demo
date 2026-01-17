-- Admins table for role-based access control
-- Users in this table have admin access to the admin dashboard

CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Only admins can read the admins table (self-check)
CREATE POLICY "Admins can read admin table" ON public.admins
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Comment for documentation
COMMENT ON TABLE public.admins IS 'Users with admin privileges for the admin dashboard';
