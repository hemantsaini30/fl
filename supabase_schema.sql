-- Supabase Schema for Keli Kunj Coaching Classes (KKCC)

-- 1. Create Enquiries Table
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  course text,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)
alter table enquiries enable row level security;

-- 3. Policy: Allow anyone (unauthenticated visitors) to submit an enquiry
create policy "Anyone can submit an enquiry"
  on enquiries for insert
  to anon
  with check (true);

-- 4. Policy: Allow only authenticated users (Admin) to view enquiries
create policy "Only logged-in admin can read enquiries"
  on enquiries for select
  to authenticated
  using (true);

-- 5. Policy: Allow only authenticated users (Admin) to update enquiries (mark as read)
create policy "Only logged-in admin can update enquiries"
  on enquiries for update
  to authenticated
  using (true);
