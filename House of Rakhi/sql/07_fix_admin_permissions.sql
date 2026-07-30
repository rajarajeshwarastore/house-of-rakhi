-- =============================================================
-- HOUSE OF RAKHI — ADMIN PERMISSIONS FIX
-- Safe to run multiple times in Supabase SQL Editor.
-- This file does not delete any data.
-- It fixes RLS policies and grants for the admin account:
--   rajarajeshwarastore@gmail.com
-- =============================================================

-- Ensure the relevant tables have RLS enabled.
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;
alter table order_counters enable row level security;
alter table id_sequences enable row level security;
alter table settings enable row level security;

-- Ensure the public schema is usable by anon/authenticated roles.
grant usage on schema public to anon, authenticated;

-- ---------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------
drop policy if exists "products_public_read" on products;
create policy "products_public_read" on products
  for select using (true);

drop policy if exists "products_admin_write" on products;
create policy "products_admin_write" on products
  for all
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com')
  with check (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select on table products to anon, authenticated;
grant insert, update, delete on table products to authenticated;

-- ---------------------------------------------------------------
-- PRODUCT IMAGES
-- ---------------------------------------------------------------
drop policy if exists "product_images_public_read" on product_images;
create policy "product_images_public_read" on product_images
  for select using (true);

drop policy if exists "product_images_admin_write" on product_images;
create policy "product_images_admin_write" on product_images
  for all
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com')
  with check (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select on table product_images to anon, authenticated;
grant insert, update, delete on table product_images to authenticated;

-- ---------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------
drop policy if exists "orders_public_insert" on orders;
create policy "orders_public_insert" on orders
  for insert with check (true);

drop policy if exists "orders_admin_read" on orders;
create policy "orders_admin_read" on orders
  for select
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

drop policy if exists "orders_admin_update" on orders;
create policy "orders_admin_update" on orders
  for update
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

drop policy if exists "orders_admin_delete" on orders;
create policy "orders_admin_delete" on orders
  for delete
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select on table orders to anon, authenticated;
grant insert on table orders to anon;
grant update, delete on table orders to authenticated;

-- ---------------------------------------------------------------
-- SETTINGS
-- ---------------------------------------------------------------
drop policy if exists "settings_public_read" on settings;
create policy "settings_public_read" on settings
  for select using (true);

drop policy if exists "settings_admin_write" on settings;
create policy "settings_admin_write" on settings
  for update
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select on table settings to anon, authenticated;
grant update on table settings to authenticated;

-- ---------------------------------------------------------------
-- ID SEQUENCES (internal admin-only helper table)
-- ---------------------------------------------------------------
drop policy if exists "id_sequences_admin_access" on id_sequences;
create policy "id_sequences_admin_access" on id_sequences
  for all
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com')
  with check (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select, insert, update on table id_sequences to authenticated;

-- ---------------------------------------------------------------
-- FUNCTIONS
-- ---------------------------------------------------------------
create or replace function generate_order_id()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := current_date;
  next_seq integer;
  new_id text;
begin
  insert into order_counters (order_date, last_seq)
  values (today, 1)
  on conflict (order_date)
  do update set last_seq = order_counters.last_seq + 1
  returning last_seq into next_seq;

  new_id := 'HOR-' || to_char(today, 'YYYYMMDD') || '-' || lpad(next_seq::text, 3, '0');
  return new_id;
end;
$$;

grant execute on function generate_order_id() to anon, authenticated;

create or replace function generate_product_id(category_prefix text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  next_seq integer;
  new_id text;
begin
  if (auth.jwt() ->> 'email') is distinct from 'rajarajeshwarastore@gmail.com' then
    raise exception 'Only the admin can generate product IDs';
  end if;

  insert into id_sequences (prefix, last_seq)
  values (upper(category_prefix), 1)
  on conflict (prefix)
  do update set last_seq = id_sequences.last_seq + 1
  returning last_seq into next_seq;

  new_id := upper(category_prefix) || lpad(next_seq::text, 3, '0');
  return new_id;
end;
$$;

grant execute on function generate_product_id(text) to authenticated;
