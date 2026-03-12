-- ==========================================
-- Fix 1: DB Trigger to increment downloads_used
-- ==========================================

CREATE OR REPLACE FUNCTION public.increment_downloads_used()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.subscriptions
  SET downloads_used = downloads_used + 1,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = NEW.user_id AND status = 'active';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_download_created ON public.downloads;

CREATE TRIGGER on_download_created
AFTER INSERT ON public.downloads
FOR EACH ROW
EXECUTE FUNCTION public.increment_downloads_used();

-- Fix any NULL downloads_used values
UPDATE public.subscriptions SET downloads_used = 0 WHERE downloads_used IS NULL;

-- Sync current downloads_used with actual download count for current period
UPDATE public.subscriptions s
SET downloads_used = (
  SELECT COUNT(*)
  FROM public.downloads d
  WHERE d.user_id = s.user_id
    AND d.downloaded_at >= s.current_period_start
)
WHERE s.status = 'active';

-- ==========================================
-- Fix 4: Add missing columns to subscriptions table
-- ==========================================

-- Add plan_id column (used by webhook and checkout success)
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS plan_id text DEFAULT 'monthly-membership';

-- Add cancel_at_period_end column (used by webhook and checkout success)
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS cancel_at_period_end boolean DEFAULT false;