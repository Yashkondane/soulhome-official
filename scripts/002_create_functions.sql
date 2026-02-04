-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(resource_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resources 
  SET download_count = download_count + 1 
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
