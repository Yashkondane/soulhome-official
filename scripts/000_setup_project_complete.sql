-- ==========================================
-- CONSOLIDATED SETUP SCRIPT
-- Combines scripts 001-013 (excluding 005)
-- ==========================================

-- ==========================================
-- 001_create_schema.sql
-- ==========================================

-- Profiles table for storing user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "admins_select_all" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Subscriptions table for tracking member subscriptions
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive' check (status in ('active', 'inactive', 'canceled', 'past_due')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  downloads_used integer default 0,
  downloads_limit integer default 3,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "users_view_own_subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "admins_manage_subscriptions" on public.subscriptions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Categories for organizing resources
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "anyone_can_view_categories" on public.categories for select to authenticated using (true);
create policy "admins_manage_categories" on public.categories for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Resources table for storing downloadable content metadata
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_path text not null,
  file_type text not null check (file_type in ('pdf', 'audio', 'video', 'other')),
  file_size bigint,
  thumbnail_path text,
  category_id uuid references public.categories(id) on delete set null,
  is_active boolean default true,
  download_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.resources enable row level security;

-- Members can view active resources, admins can view all
create policy "members_view_active_resources" on public.resources for select using (
  is_active = true and 
  exists (
    select 1 from public.subscriptions 
    where user_id = auth.uid() and status = 'active'
  )
);
create policy "admins_manage_resources" on public.resources for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Tags for resources
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tags enable row level security;

create policy "anyone_can_view_tags" on public.tags for select to authenticated using (true);
create policy "admins_manage_tags" on public.tags for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Resource tags junction table
create table if not exists public.resource_tags (
  resource_id uuid references public.resources(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (resource_id, tag_id)
);

alter table public.resource_tags enable row level security;

create policy "anyone_can_view_resource_tags" on public.resource_tags for select to authenticated using (true);
create policy "admins_manage_resource_tags" on public.resource_tags for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Downloads tracking table
create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  billing_period_start timestamp with time zone not null,
  billing_period_end timestamp with time zone not null,
  downloaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.downloads enable row level security;

create policy "users_view_own_downloads" on public.downloads for select using (auth.uid() = user_id);
create policy "users_insert_own_downloads" on public.downloads for insert with check (auth.uid() = user_id);
create policy "admins_view_all_downloads" on public.downloads for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Function to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.update_updated_at_column();

create trigger update_resources_updated_at before update on public.resources
  for each row execute function public.update_updated_at_column();

-- Insert some default categories
insert into public.categories (name, description) values
  ('Meditations', 'Guided meditation practices'),
  ('Kriyas', 'Kundalini yoga exercise sets'),
  ('Mantras', 'Sacred sound practices'),
  ('Teachings', 'Educational materials and lectures'),
  ('Music', 'Sacred music and chants')
on conflict (name) do nothing;

-- Insert some default tags
insert into public.tags (name) values
  ('Beginner'),
  ('Intermediate'),
  ('Advanced'),
  ('Morning Practice'),
  ('Evening Practice'),
  ('Stress Relief'),
  ('Energy'),
  ('Healing'),
  ('Prosperity'),
  ('Relaxation')
on conflict (name) do nothing;


-- ==========================================
-- 002_create_functions.sql
-- ==========================================

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(resource_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resources 
  SET download_count = download_count + 1 
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 003_fix_rls_policies.sql
-- ==========================================

-- Fix infinite recursion in RLS policies by using a security definer function
-- This function checks admin status without triggering RLS

-- Drop the problematic admin policies
drop policy if exists "admins_select_all" on public.profiles;
drop policy if exists "admins_manage_subscriptions" on public.subscriptions;
drop policy if exists "admins_manage_categories" on public.categories;
drop policy if exists "admins_manage_resources" on public.resources;
drop policy if exists "admins_manage_tags" on public.tags;
drop policy if exists "admins_manage_resource_tags" on public.resource_tags;
drop policy if exists "admins_view_all_downloads" on public.downloads;

-- Create a security definer function to check admin status
-- This bypasses RLS and directly checks the is_admin column
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  );
$$;

-- Recreate admin policies using the security definer function
create policy "admins_select_all" on public.profiles
  for select
  using (public.is_admin());

create policy "admins_manage_subscriptions" on public.subscriptions
  for all
  using (public.is_admin());

create policy "admins_manage_categories" on public.categories
  for all
  using (public.is_admin());

create policy "admins_manage_resources" on public.resources
  for all
  using (public.is_admin());

create policy "admins_manage_tags" on public.tags
  for all
  using (public.is_admin());

create policy "admins_manage_resource_tags" on public.resource_tags
  for all
  using (public.is_admin());

create policy "admins_view_all_downloads" on public.downloads
  for select
  using (public.is_admin());


-- ==========================================
-- 004_simplify_rls.sql
-- ==========================================

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


-- ==========================================
-- 006_fix_schema_migration.sql
-- ==========================================

-- MIGRATION SCRIPT: Fix Schema & Setup Storage

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


-- ==========================================
-- 007_fix_resources_only.sql
-- ==========================================

-- SIMPLE FIX: Resources Table & Buckets ONLY

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

  -- FIX LEGACY COLUMN: file_type (remove not-null constraint if it exists)
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'file_type') then
    alter table public.resources alter column file_type drop not null;
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


-- ==========================================
-- 008_fix_subscription_rls.sql
-- ==========================================

-- Fix RLS policies to ensure Service Role can manage subscriptions
-- and User's can view their own.

-- 1. Drop existing policies to avoid conflicts
drop policy if exists "users_view_own_subscription" on public.subscriptions;
drop policy if exists "admins_manage_subscriptions" on public.subscriptions;
drop policy if exists "service_role_manage_subscriptions" on public.subscriptions;

-- 2. Create comprehensive policies

-- Policy: Users can view their own subscription
create policy "users_view_own_subscription" 
on public.subscriptions for select 
using (auth.uid() = user_id);

-- Policy: Service Role (and Admins) can do EVERYTHING
-- Note: 'service_role' key bypasses RLS by default in Supabase client, 
-- but explicit policies are good for safety if using other clients.
create policy "admins_and_service_role_manage_subscriptions" 
on public.subscriptions for all 
using (
  (auth.jwt() ->> 'role') = 'service_role' OR
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- 3. Fix "Status" constraint if necessary
-- Some Stripe statuses (like 'trialing') might fail the check constraint.
-- We'll drop the check and just allow text, or update it.
alter table public.subscriptions drop constraint if exists subscriptions_status_check;

-- Optional: Add index for faster lookups
create index if not exists idx_subscriptions_stripe_sub_id on public.subscriptions(stripe_subscription_id);


-- ==========================================
-- 009_create_events_bookings.sql
-- ==========================================

-- Create Events table
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date timestamp with time zone,
  price integer not null, -- stored in cents
  stripe_price_id text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.events enable row level security;

-- Policies for Events
create policy "Anyone can view events" on public.events
  for select using (true);

create policy "Admins can manage events" on public.events
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Create Bookings table (for one-time payments)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  amount_paid integer, -- in cents
  currency text default 'gbp',
  status text default 'pending', -- pending, paid, failed, refunded
  stripe_session_id text,
  payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.bookings enable row level security;

-- Policies for Bookings
create policy "Users can view own bookings" on public.bookings
  for select using (auth.uid() = user_id);

create policy "Admins can view all bookings" on public.bookings
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Function to handle booking updates (optional, mainly handled by variable webhook)

-- 6. LINK RESOURCES TO EVENTS
-- Add event_id to resources
alter table public.resources 
add column if not exists event_id uuid references public.events(id) on delete set null;

-- Add RLS Policy for Event Resources
create policy "Users can view resources for their booked events" on public.resources
for select using (
  is_active = true and
  event_id is not null and
  exists (
    select 1 from public.bookings
    where user_id = auth.uid()
      and event_id = public.resources.event_id
      and status = 'paid'
  )
);


-- ==========================================
-- 010_test_data.sql
-- ==========================================

-- TEST DATA SCRIPT
-- Run this to give the LAST CREATED USER immediate access.
-- Useful for testing "Members Only" areas without paying.

DO $$
DECLARE
  v_user_id uuid;
  v_event_id uuid;
BEGIN
  -- 1. Get the most recently created user
  SELECT id INTO v_user_id FROM auth.users ORDER BY created_at DESC LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'No users found. Sign up a user first!';
    RETURN;
  END IF;

  RAISE NOTICE 'Granting access to User ID: %', v_user_id;

  -- 2. Make them a SUBSCRIBER (Monthly)
  INSERT INTO public.subscriptions (user_id, status, plan_id, current_period_end)
  VALUES (
    v_user_id, 
    'active', 
    'monthly-membership', 
    now() + interval '30 days'
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    status = 'active', 
    current_period_end = now() + interval '30 days';

  -- 3. Create a Dummy Event (if none exist)
  INSERT INTO public.events (title, description, price, date)
  VALUES ('Test Event Workshop', 'A test event to verify access', 2000, now() + interval '7 days')
  RETURNING id INTO v_event_id;

  -- 4. Give them a BOOKING for this event
  INSERT INTO public.bookings (user_id, event_id, status, amount_paid)
  VALUES (v_user_id, v_event_id, 'paid', 2000);

  RAISE NOTICE 'Success! User is now a Subscriber and has 1 Event Booking.';
END $$;


-- ==========================================
-- 011_fix_subscription_schema.sql
-- ==========================================

-- Add plan_id to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS plan_id text;

-- Optional: Add index for queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON public.subscriptions(plan_id);


-- ==========================================
-- 012_add_cancel_at_period_end.sql
-- ==========================================

-- Add cancel_at_period_end to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS cancel_at_period_end boolean default false;

-- Add comment
COMMENT ON COLUMN public.subscriptions.cancel_at_period_end IS 'If true, subscription will cancel at the end of the current period.';


-- ==========================================
-- 013_fix_downloads_logic.sql
-- ==========================================

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
