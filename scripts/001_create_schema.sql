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
