-- ========================================================
-- PERFECT SECURITY RESET
-- This script wipes all confusing UI rules and applies the exact
-- correct security to make your website and dashboard work.
-- ========================================================

-- 1. TURN ON THE LOCKS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- 2. WIPE ALL OLD/BROKEN POLICIES (Start fresh)
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "subscriptions_select_own" ON subscriptions;
DROP POLICY IF EXISTS "public_view_resources" ON resources;
DROP POLICY IF EXISTS "public_view_categories" ON categories;
DROP POLICY IF EXISTS "public_view_blogs" ON blogs;
DROP POLICY IF EXISTS "downloads_select_own" ON downloads;
DROP POLICY IF EXISTS "downloads_insert_own" ON downloads;
DROP POLICY IF EXISTS "Enable read access for all users" ON resources;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON subscriptions;
DROP POLICY IF EXISTS "Enable read access for everyone" ON resources;

-- 3. PROFILES (Security: You can only see/edit your own profile)
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 4. SUBSCRIPTIONS & DOWNLOADS (Security: You can only see your own private data)
CREATE POLICY "subscriptions_select_own" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "downloads_select_own" ON public.downloads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "downloads_insert_own" ON public.downloads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. PUBLIC CONTENT (Security: Anyone can see published content)
CREATE POLICY "public_view_resources" ON public.resources FOR SELECT USING (is_published = true);
CREATE POLICY "public_view_blogs" ON public.blogs FOR SELECT USING (is_published = true);
CREATE POLICY "public_view_categories" ON public.categories FOR SELECT USING (true);

-- 6. GRANT BASIC ACCESS RIGHTS TO THE NEXT.JS WEBSITE
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT SELECT ON public.resources TO authenticated, anon;
GRANT SELECT ON public.blogs TO authenticated, anon;
GRANT SELECT ON public.categories TO authenticated, anon;
GRANT SELECT, INSERT ON public.downloads TO authenticated;
