-- Public views for Stripe Sync Engine data (read-only, minimal columns)
-- Using SECURITY DEFINER so views bypass RLS on stripe schema
-- Access controlled via GRANT statements below

-- Drop existing views first
DROP VIEW IF EXISTS public.stripe_customers;
DROP VIEW IF EXISTS public.stripe_products;
DROP VIEW IF EXISTS public.stripe_prices;
DROP VIEW IF EXISTS public.stripe_subscriptions;

-- Customers view (for email-based user lookup)
CREATE VIEW public.stripe_customers AS
SELECT id, email FROM stripe.customers;

-- Products view (for pricing page)
CREATE VIEW public.stripe_products AS
SELECT id, active, name, description, metadata
FROM stripe.products;

-- Prices view (for pricing page)
CREATE VIEW public.stripe_prices AS
SELECT id, product, active, unit_amount, currency, type, recurring
FROM stripe.prices;

-- Subscriptions view (for user subscription status)
CREATE VIEW public.stripe_subscriptions AS
SELECT id, customer, status, items, current_period_end, cancel_at_period_end, created
FROM stripe.subscriptions;

-- Grant read access (this is where we control permissions)
GRANT SELECT ON public.stripe_customers TO anon, authenticated;
GRANT SELECT ON public.stripe_products TO anon, authenticated;
GRANT SELECT ON public.stripe_prices TO anon, authenticated;
GRANT SELECT ON public.stripe_subscriptions TO authenticated;