-- Add columns to store Google Drive permission details
ALTER TABLE public.downloads
ADD COLUMN IF NOT EXISTS drive_permission_id text,
ADD COLUMN IF NOT EXISTS drive_file_id text;

-- Add index on drive_file_id for potential lookups
CREATE INDEX IF NOT EXISTS idx_downloads_drive_file_id ON public.downloads(drive_file_id);
