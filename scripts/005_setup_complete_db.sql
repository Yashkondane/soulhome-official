-- ==========================================
-- 1. UTILITY FUNCTIONS
-- ==========================================

-- Function to update updated_at timestamp automatically
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- ==========================================
-- 2. TABLES SETUP
-- ==========================================

-- RESOURCES TABLE
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  type text not null check (type in ('pdf', 'audio', 'video')),
  file_url text not null,
  thumbnail_url text,
  duration_minutes integer,
  file_size_bytes bigint,
  category_id uuid references public.categories(id) on delete set null,
  is_published boolean default false,
  download_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger for resources updated_at
drop trigger if exists update_resources_updated_at on public.resources;
create trigger update_resources_updated_at before update on public.resources
  for each row execute function public.update_updated_at_column();

-- TESTIMONIALS TABLE
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  location text,
  avatar_url text,
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger for testimonials updated_at
drop trigger if exists update_testimonials_updated_at on public.testimonials;
create trigger update_testimonials_updated_at before update on public.testimonials
  for each row execute function public.update_updated_at_column();

-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
alter table public.resources enable row level security;
alter table public.testimonials enable row level security;

-- RESOURCES POLICIES
-- Published resources are viewable by everyone (or you can restrict to authenticated members)
create policy "Published resources are viewable by everyone" 
  on public.resources for select 
  using (is_published = true);

-- Admins can do everything
create policy "Admins can manage all resources" 
  on public.resources for all 
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- TESTIMONIALS POLICIES
-- Everyone can view testimonials
create policy "Anyone can view testimonials" 
  on public.testimonials for select 
  using (true);

-- Admins can manage testimonials
create policy "Admins can manage testimonials" 
  on public.testimonials for all 
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ==========================================
-- 4. STORAGE BUCKETS SETUP
-- ==========================================

-- Insert buckets if they don't exist
insert into storage.buckets (id, name, public)
values 
  ('resources', 'resources', true),
  ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

-- STORAGE POLICIES

-- RESOURCES BUCKET
-- Allow public read access to resources bucket
create policy "Public Access Resources"
  on storage.objects for select
  using ( bucket_id = 'resources' );

-- Allow authenticated admins to upload/update/delete in resources bucket
-- Note: You might want to stricter checks for 'admin' here depending on your auth setup
create policy "Admin Operations Resources"
  on storage.objects for insert
  with check ( bucket_id = 'resources' and auth.role() = 'authenticated' );

create policy "Admin Update Resources"
  on storage.objects for update
  using ( bucket_id = 'resources' and auth.role() = 'authenticated' );

create policy "Admin Delete Resources"
  on storage.objects for delete
  using ( bucket_id = 'resources' and auth.role() = 'authenticated' );

-- THUMBNAILS BUCKET
-- Allow public read access
create policy "Public Access Thumbnails"
  on storage.objects for select
  using ( bucket_id = 'thumbnails' );

-- Allow authenticated uploads (similar to above)
create policy "Admin Operations Thumbnails"
  on storage.objects for insert
  with check ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );

create policy "Admin Update Thumbnails"
  on storage.objects for update
  using ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );

create policy "Admin Delete Thumbnails"
  on storage.objects for delete
  using ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );
