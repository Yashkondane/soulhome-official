-- ==========================================
-- FIX STUCK SUBSCRIPTIONS
-- Run this in your Supabase SQL Editor to activate
-- users who paid but didn't get subscribed.
-- ==========================================

-- This finds all profiles that have a stripe_customer_id
-- but NO matching subscription record, and creates one.

-- Step 1: Check who is stuck (run this first to see affected users)
SELECT 
  p.id as user_id,
  p.email,
  p.stripe_customer_id,
  s.id as subscription_id,
  s.status
FROM profiles p
LEFT JOIN subscriptions s ON s.user_id = p.id
WHERE p.stripe_customer_id IS NOT NULL
  AND (s.id IS NULL OR s.status != 'active');

-- Step 2: If you see stuck users above, run this to activate them.
-- NOTE: Replace the user IDs below with the actual ones from Step 1,
-- or use the broader INSERT below.

-- Option A: Activate ALL users who have a stripe_customer_id but no subscription
INSERT INTO subscriptions (user_id, stripe_customer_id, status, plan_id, current_period_end)
SELECT 
  p.id,
  p.stripe_customer_id,
  'active',
  'monthly-membership',
  NOW() + INTERVAL '30 days'
FROM profiles p
LEFT JOIN subscriptions s ON s.user_id = p.id
WHERE p.stripe_customer_id IS NOT NULL
  AND s.id IS NULL;

-- Option B: If they have a canceled/inactive subscription, reactivate it
UPDATE subscriptions 
SET status = 'active', 
    current_period_end = NOW() + INTERVAL '30 days',
    updated_at = NOW()
WHERE user_id IN (
  SELECT p.id FROM profiles p
  WHERE p.stripe_customer_id IS NOT NULL
)
AND status != 'active';
