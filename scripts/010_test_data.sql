-- ============================================================
-- TEST DATA SCRIPT
-- Run this to give the LAST CREATED USER immediate access.
-- Useful for testing "Members Only" areas without paying.
-- ============================================================

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
