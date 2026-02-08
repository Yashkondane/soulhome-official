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
