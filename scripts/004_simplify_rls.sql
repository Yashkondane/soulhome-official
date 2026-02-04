-- Drop existing problematic policies
DROP POLICY IF EXISTS "admins_select_all" ON profiles;
DROP POLICY IF EXISTS "admins_update_all" ON profiles;

-- Simple policies: users can view and update their own profile
-- Admins will be checked at application level, not RLS level
CREATE POLICY "users_select_own_profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- For resources table, simplify admin policies
DROP POLICY IF EXISTS "admins_insert" ON resources;
DROP POLICY IF EXISTS "admins_update" ON resources;
DROP POLICY IF EXISTS "admins_delete" ON resources;

-- Recreate without the recursive check
CREATE POLICY "admins_full_access" ON resources
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Same for categories
DROP POLICY IF EXISTS "admins_insert" ON categories;
DROP POLICY IF EXISTS "admins_update" ON categories;
DROP POLICY IF EXISTS "admins_delete" ON categories;

CREATE POLICY "admins_full_access" ON categories
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- For downloads, keep the existing policies as they don't have the recursion issue
-- Just ensure they work correctly
DROP POLICY IF EXISTS "admins_select_all" ON downloads;

CREATE POLICY "admins_view_all_downloads" ON downloads
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );
