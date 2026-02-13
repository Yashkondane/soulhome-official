-- ==========================================
-- 015_clear_subscriptions_data.sql
-- ==========================================

-- DANGER: This script deletes ALL data from subscriptions and downloads tables.
-- Run this in your Supabase SQL Editor.

-- 1. Clear Downloads (since they might depend on subscriptions or user state)
DELETE FROM public.downloads;

-- 2. Clear Subscriptions
DELETE FROM public.subscriptions;

-- Note: This does NOT delete users (auth.users or public.profiles).
-- If you want to delete users, you must do that via the Supabase Dashboard > Authentication > Users
-- or use a separate script to delete from auth.users (which will cascade to profiles).
