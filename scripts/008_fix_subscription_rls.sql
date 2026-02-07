-- Fix RLS policies to ensure Service Role can manage subscriptions
-- and User's can view their own.

-- 1. Drop existing policies to avoid conflicts
drop policy if exists "users_view_own_subscription" on public.subscriptions;
drop policy if exists "admins_manage_subscriptions" on public.subscriptions;
drop policy if exists "service_role_manage_subscriptions" on public.subscriptions;

-- 2. Create comprehensive policies

-- Policy: Users can view their own subscription
create policy "users_view_own_subscription" 
on public.subscriptions for select 
using (auth.uid() = user_id);

-- Policy: Service Role (and Admins) can do EVERYTHING
-- Note: 'service_role' key bypasses RLS by default in Supabase client, 
-- but explicit policies are good for safety if using other clients.
create policy "admins_and_service_role_manage_subscriptions" 
on public.subscriptions for all 
using (
  (auth.jwt() ->> 'role') = 'service_role' OR
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- 3. Fix "Status" constraint if necessary
-- Some Stripe statuses (like 'trialing') might fail the check constraint.
-- We'll drop the check and just allow text, or update it.
alter table public.subscriptions drop constraint if exists subscriptions_status_check;

-- Optional: Add index for faster lookups
create index if not exists idx_subscriptions_stripe_sub_id on public.subscriptions(stripe_subscription_id);
