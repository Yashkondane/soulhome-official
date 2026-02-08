-- Function to increment downloads_used
CREATE OR REPLACE FUNCTION public.increment_downloads_used()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment the downloads_used count for the user's active subscription
  UPDATE public.subscriptions
  SET downloads_used = downloads_used + 1,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = NEW.user_id AND status = 'active';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function after insert on downloads
DROP TRIGGER IF EXISTS on_download_created ON public.downloads;

CREATE TRIGGER on_download_created
AFTER INSERT ON public.downloads
FOR EACH ROW
EXECUTE FUNCTION public.increment_downloads_used();

-- Add unique constraint to prevent duplicate downloads
ALTER TABLE public.downloads 
ADD CONSTRAINT downloads_user_resource_unique UNIQUE (user_id, resource_id);

-- Fix downloads_used display if it's currently NULL to 0
UPDATE public.subscriptions SET downloads_used = 0 WHERE downloads_used IS NULL;
