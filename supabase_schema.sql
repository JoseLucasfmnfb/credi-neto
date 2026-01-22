-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Enum for User Roles
create type public.user_role as enum ('superadmin', 'admin', 'user');

-- 2. Create Profiles Table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role public.user_role default 'user'::public.user_role,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- 3. Create Transactions Table (Credit History)
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount integer not null, -- Positive for add, negative for remove
  description text,
  performed_by uuid references public.profiles(id), -- Who performed the action (Admin)
  created_at timestamptz default now()
);

-- Enable RLS on transactions
alter table public.transactions enable row level security;

-- 4. RLS Policies

-- PROFILES
-- Public can read profiles (needed to see other users if required, or restrict to self/admin)
-- Let's restrict: Users can read own. Admins can read all.
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Admins and Superadmins can view all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'superadmin')
    )
  );

-- Only Superadmin can update roles (or Admins can update 'user' to 'admin' but not touch 'superadmin')
-- Simplified: Admins can update profiles (promote/demote), but UI will handle logic to protect Superadmin.
-- DB Level Protection: Prevent update if target is superadmin, unless actor is superadmin (though superadmin is unique usually).
create policy "Admins can update profiles" on public.profiles
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'superadmin')
    )
  );

-- TRANSACTIONS
-- Users can view their own transactions
create policy "Users can view own transactions" on public.transactions
  for select using (auth.uid() = user_id);

-- Admins can view all transactions
create policy "Admins can view all transactions" on public.transactions
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'superadmin')
    )
  );

-- Only Admins can insert transactions (give/take credits)
create policy "Admins can insert transactions" on public.transactions
  for insert with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'superadmin')
    )
  );

-- 5. Triggers for Auto-Profile Creation
-- This function runs when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Helper View for Current User Credits (Optional but helpful)
create view public.user_credits as
select
  user_id,
  sum(amount) as total_credits
from public.transactions
group by user_id;
