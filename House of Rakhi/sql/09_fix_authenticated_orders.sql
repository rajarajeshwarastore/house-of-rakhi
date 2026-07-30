-- =============================================================
-- FIX: Grant authenticated role permissions & RLS policy for orders
-- Safe to run on an existing database. Only touches `orders`.
-- =============================================================

begin;

-- Ensure RLS is enabled on orders (no-op if already enabled)
alter table if exists public.orders enable row level security;

-- Give the authenticated role the SQL-level privileges it needs
grant insert on public.orders to authenticated;
grant select on public.orders to authenticated;

-- Ensure there is an INSERT policy that allows authenticated users
drop policy if exists orders_authenticated_insert on public.orders;
create policy orders_authenticated_insert on public.orders
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');

commit;

-- End of file
