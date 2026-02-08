-- Add plan_id to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS plan_id text;

-- Optional: Add index for queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON public.subscriptions(plan_id);

-- Verify it exists (Supabase SQL editor will show "Success")
