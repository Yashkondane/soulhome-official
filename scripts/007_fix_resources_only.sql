-- ==========================================
-- SIMPLE FIX: Resources Table & Buckets ONLY
-- ==========================================

-- 1. UTILITY FUNCTION (Required for automated timestamps)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 2. FIX RESOURCES TABLE COLUMNS
do $$
begin
  -- Rename file_path -> file_url
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'file_path') then
    alter table public.resources rename column file_path to file_url;
  end if;

  -- Rename thumbnail_path -> thumbnail_url
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'thumbnail_path') then
    alter table public.resources rename column thumbnail_path to thumbnail_url;
  end if;

   -- Add slug
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'slug') then
    alter table public.resources add column slug text;
  end if;

  -- Add type
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'type') then
    alter table public.resources add column type text check (type in ('pdf', 'audio', 'video')) default 'pdf';
  end if;

  -- Add is_published
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'is_published') then
    alter table public.resources add column is_published boolean default false;
  end if;

  -- Add duration_minutes
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'duration_minutes') then
    alter table public.resources add column duration_minutes integer;
  end if;

   -- Add file_size_bytes
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'file_size_bytes') then
    alter table public.resources add column file_size_bytes bigint;
  end if;

end $$;

-- 3. ENSURE STORAGE BUCKETS EXIST
insert into storage.buckets (id, name, public)
values 
  ('resources', 'resources', true),
  ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

-- 4. RESET RLS POLICIES FOR RESOURCES
alter table public.resources enable row level security;

-- Drop old policies to avoid conflicts
drop policy if exists "members_view_active_resources" on public.resources;
drop policy if exists "admins_manage_resources" on public.resources;
drop policy if exists "Published resources are viewable by everyone" on public.resources;
drop policy if exists "Admins can manage all resources" on public.resources;

-- Create fresh Policies
create policy "Published resources are viewable by everyone" 
  on public.resources for select 
  using (is_published = true);

create policy "Admins can manage all resources" 
  on public.resources for all 
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- 5. STORAGE POLICIES (Simplified)
drop policy if exists "Public Access Resources" on storage.objects;
drop policy if exists "Public Access Thumbnails" on storage.objects;
drop policy if exists "Admin Access Resources" on storage.objects;
drop policy if exists "Admin Access Thumbnails" on storage.objects;
drop policy if exists "Admin Operations Resources" on storage.objects;
drop policy if exists "Admin Operations Thumbnails" on storage.objects;

-- Allow public read
create policy "Public Access Resources" on storage.objects for select using ( bucket_id = 'resources' );
create policy "Public Access Thumbnails" on storage.objects for select using ( bucket_id = 'thumbnails' );

-- Allow authenticated users (admins) to upload/edit/delete
create policy "Admin Operations Resources" on storage.objects for insert with check ( bucket_id = 'resources' and auth.role() = 'authenticated' );
create policy "Admin Operations Thumbnails" on storage.objects for insert with check ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );

