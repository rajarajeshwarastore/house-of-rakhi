-- =============================================================
-- HOUSE OF RAKHI — ADMIN LOCKDOWN
-- Run this AFTER 01_schema.sql and 02_security.sql.
--
-- WHY THIS FILE EXISTS:
-- 02_security.sql's policies used `auth.role() = 'authenticated'` to
-- mean "is an admin". That is NOT what it checks — it just checks
-- "is ANY logged-in Supabase user", admin or not. If a customer ever
-- creates an account, they'd pass that check too. This file replaces
-- those policies with a check against one specific admin email.
-- =============================================================

-- ---------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------
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
drop policy if exists "product_images_admin_write" on product_images;
create policy "product_images_admin_write" on product_images
  for all
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com')
  with check (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select on table product_images to anon, authenticated;
grant insert, update, delete on table product_images to authenticated;

-- ---------------------------------------------------------------
-- ORDERS (customers can still INSERT via checkout — that policy from
-- 02_security.sql is untouched. Only read/update/delete are locked down.)
-- ---------------------------------------------------------------
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
drop policy if exists "settings_admin_write" on settings;
create policy "settings_admin_write" on settings
  for update
  using (auth.jwt() ->> 'email' = 'rajarajeshwarastore@gmail.com');

grant select on table settings to anon, authenticated;
grant update on table settings to authenticated;

-- ---------------------------------------------------------------
-- generate_product_id(): also update its internal admin check
-- ---------------------------------------------------------------
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
