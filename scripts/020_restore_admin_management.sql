-- ==========================================
-- RESTORE ADMIN MANAGEMENT PERMISSIONS
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. RESOURCES (Fixes the upload error)
DROP POLICY IF EXISTS "Admins can manage all resources" ON public.resources;
CREATE POLICY "Admins can manage all resources" 
ON public.resources FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 2. BLOGS
DROP POLICY IF EXISTS "Admins can manage all blogs" ON public.blogs;
CREATE POLICY "Admins can manage all blogs" 
ON public.blogs FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 3. CATEGORIES
DROP POLICY IF EXISTS "Admins can manage all categories" ON public.categories;
CREATE POLICY "Admins can manage all categories" 
ON public.categories FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 4. TESTIMONIALS
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage all testimonials" 
ON public.testimonials FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 5. ENSURE PERMISSIONS
GRANT ALL ON public.resources TO authenticated;
GRANT ALL ON public.blogs TO authenticated;
GRANT ALL ON public.categories TO authenticated;
GRANT ALL ON public.testimonials TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- Optional: Ensure ID columns use the correct sequence if needed 
-- (Usually handled by default, but good for completeness)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
