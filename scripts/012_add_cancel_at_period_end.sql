-- Add cancel_at_period_end to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS cancel_at_period_end boolean default false;

-- Add comment
COMMENT ON COLUMN public.subscriptions.cancel_at_period_end IS 'If true, subscription will cancel at the end of the current period.';

-- Verify it exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'subscriptions' AND column_name = 'cancel_at_period_end';
