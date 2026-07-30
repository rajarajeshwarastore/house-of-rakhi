-- =============================================================
-- FIX: Orders table permissions & RLS policies (idempotent)
-- Safe to run on an existing database. Only touches `orders`.
-- =============================================================

begin;

-- Ensure RLS is enabled on orders (no-op if already enabled)
alter table if exists public.orders enable row level security;

-- Ensure the anon role has the INSERT privilege so it can attempt inserts.
-- Row-level policies below control whether the insert is allowed.
grant insert on public.orders to anon;

-- Recreate only the orders policies (drop first if they already exist).
drop policy if exists orders_public_insert on public.orders;
create policy orders_public_insert on public.orders
  for insert
  with check (true);

drop policy if exists orders_admin_read on public.orders;
create policy orders_admin_read on public.orders
  for select
  using (auth.role() = 'authenticated');

drop policy if exists orders_admin_update on public.orders;
create policy orders_admin_update on public.orders
  for update
  using (auth.role() = 'authenticated');

drop policy if exists orders_admin_delete on public.orders;
create policy orders_admin_delete on public.orders
  for delete
  using (auth.role() = 'authenticated');

commit;

-- End of file
