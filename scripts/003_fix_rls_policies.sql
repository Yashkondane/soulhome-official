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
