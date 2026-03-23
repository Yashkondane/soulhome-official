-- ==========================================
-- 016_create_blog_system.sql
-- ==========================================

-- 1. Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_image_url text NOT NULL,
  gallery_image_urls text[] DEFAULT '{}',
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at 
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 2. Blog Policies
DROP POLICY IF EXISTS "Published blogs are viewable by everyone" ON public.blogs;
CREATE POLICY "Published blogs are viewable by everyone" 
  ON public.blogs FOR SELECT 
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage all blogs" ON public.blogs;
CREATE POLICY "Admins can manage all blogs" 
  ON public.blogs FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- 3. Storage Bucket for Blog Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for blog-images
DROP POLICY IF EXISTS "Public Access Blog Images" ON storage.objects;
CREATE POLICY "Public Access Blog Images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Admin Operations Blog Images" ON storage.objects;
CREATE POLICY "Admin Operations Blog Images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Update Blog Images" ON storage.objects;
CREATE POLICY "Admin Update Blog Images" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Delete Blog Images" ON storage.objects;
CREATE POLICY "Admin Delete Blog Images" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
