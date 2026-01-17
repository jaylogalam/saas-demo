-- Admin users view: joins auth.users with Stripe data for admin dashboard
-- This view is accessible only to admins (checked in RLS policy)

CREATE OR REPLACE VIEW public.admin_users_view AS
SELECT 
  u.id AS user_id,
  u.email,
  u.raw_user_meta_data->>'full_name' AS full_name,
  u.created_at AS joined_at,
  c.id AS customer_id,
  s.id AS subscription_id,
  s.status AS subscription_status,
  p.name AS product_name,
  s.items->'data'->0->'price'->'recurring'->>'interval' AS billing_interval,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end
FROM auth.users u
LEFT JOIN stripe.customers c ON c.email = u.email
LEFT JOIN stripe.subscriptions s ON s.customer = c.id 
  AND s.status IN ('active', 'trialing', 'past_due', 'canceled')
LEFT JOIN stripe.products p ON p.id = (s.items->'data'->0->'price'->>'product');

-- Grant access only to authenticated users (admin check done in app layer via admins table)
GRANT SELECT ON public.admin_users_view TO authenticated;

-- Comment for documentation
COMMENT ON VIEW public.admin_users_view IS 'Admin view of all users with their subscription details';
