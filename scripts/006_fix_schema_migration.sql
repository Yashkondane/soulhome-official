-- ==========================================
-- MIGRATION SCRIPT: Fix Schema & Setup Storage
-- ==========================================

-- 1. UTILITY FUNCTIONS
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 2. MIGRATE RESOURCES TABLE
do $$
begin
  -- Rename file_path -> file_url if it exists
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'file_path') then
    alter table public.resources rename column file_path to file_url;
  end if;

  -- Rename thumbnail_path -> thumbnail_url if it exists
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'thumbnail_path') then
    alter table public.resources rename column thumbnail_path to thumbnail_url;
  end if;

   -- Add slug column
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'slug') then
    alter table public.resources add column slug text;
    -- Note: We make it nullable first to avoid errors with existing rows, 
    -- but you should populate it for existing data.
  end if;

  -- Add type column
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'type') then
    alter table public.resources add column type text check (type in ('pdf', 'audio', 'video')) default 'pdf';
  end if;
  
  -- Add file_type column drop constraint if it conflicts (we use 'type' now, but keep file_type if needed or migrate)
  -- For now, we utilize the new 'type' column.

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

-- 3. CREATE TESTIMONIALS TABLE
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

-- 4. STORAGE BUCKETS
insert into storage.buckets (id, name, public)
values 
  ('resources', 'resources', true),
  ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

-- 5. RLS POLICIES (Drop first to ensure clean state)

-- Enable RLS
alter table public.resources enable row level security;
alter table public.testimonials enable row level security;

-- Drop generic policies we might want to override
drop policy if exists "Published resources are viewable by everyone" on public.resources;
drop policy if exists "Admins can manage all resources" on public.resources;
drop policy if exists "members_view_active_resources" on public.resources;
drop policy if exists "admins_manage_resources" on public.resources;

-- Recreate Policies

-- Resources
create policy "Published resources are viewable by everyone" 
  on public.resources for select 
  using (is_published = true);

create policy "Admins can manage all resources" 
  on public.resources for all 
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Testimonials
drop policy if exists "Anyone can view testimonials" on public.testimonials;
drop policy if exists "Admins can manage testimonials" on public.testimonials;

create policy "Anyone can view testimonials" 
  on public.testimonials for select 
  using (true);

create policy "Admins can manage testimonials" 
  on public.testimonials for all 
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Storage Policies
-- (These often fail if they exist, so we use DO block or just ignore errors if complex, 
-- but 'create policy if not exists' isn't standard in older PG. We'll drop/create.)

drop policy if exists "Public Access Resources" on storage.objects;
drop policy if exists "Admin Operations Resources" on storage.objects;
drop policy if exists "Admin Update Resources" on storage.objects;
drop policy if exists "Admin Delete Resources" on storage.objects;
drop policy if exists "Public Access Thumbnails" on storage.objects;
drop policy if exists "Admin Operations Thumbnails" on storage.objects;
drop policy if exists "Admin Update Thumbnails" on storage.objects;
drop policy if exists "Admin Delete Thumbnails" on storage.objects;

-- Resources Bucket
create policy "Public Access Resources"
  on storage.objects for select
  using ( bucket_id = 'resources' );

create policy "Admin Operations Resources"
  on storage.objects for insert
  with check ( bucket_id = 'resources' and auth.role() = 'authenticated' );

create policy "Admin Update Resources"
  on storage.objects for update
  using ( bucket_id = 'resources' and auth.role() = 'authenticated' );

create policy "Admin Delete Resources"
  on storage.objects for delete
  using ( bucket_id = 'resources' and auth.role() = 'authenticated' );

-- Thumbnails Bucket
create policy "Public Access Thumbnails"
  on storage.objects for select
  using ( bucket_id = 'thumbnails' );

create policy "Admin Operations Thumbnails"
  on storage.objects for insert
  with check ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );

create policy "Admin Update Thumbnails"
  on storage.objects for update
  using ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );

create policy "Admin Delete Thumbnails"
  on storage.objects for delete
  using ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );
