-- =============================================================
-- HOUSE OF RAKHI — SECURITY: RLS POLICIES + ID GENERATOR FUNCTIONS
-- Run this after 01_schema.sql
-- =============================================================

-- ---------------------------------------------------------------
-- Enable RLS everywhere
-- ---------------------------------------------------------------
alter table products       enable row level security;
alter table product_images enable row level security;
alter table orders         enable row level security;
alter table order_counters enable row level security;
alter table id_sequences   enable row level security;
alter table settings       enable row level security;

-- ---------------------------------------------------------------
-- PRODUCTS: everyone can read; only logged-in admins can write
-- ---------------------------------------------------------------
create policy "products_public_read" on products
  for select using (true);

create policy "products_admin_write" on products
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------
-- PRODUCT IMAGES: everyone can read; only admins can write
-- ---------------------------------------------------------------
create policy "product_images_public_read" on product_images
  for select using (true);

create policy "product_images_admin_write" on product_images
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------
-- ORDERS: customers can create an order (via WhatsApp checkout),
-- but only admins can read or manage them afterward. Customers
-- never get a public "read your order" page — WhatsApp is the
-- confirmation channel, matching how the site works today.
-- ---------------------------------------------------------------
create policy "orders_public_insert" on orders
  for insert with check (true);

create policy "orders_admin_read" on orders
  for select using (auth.role() = 'authenticated');

create policy "orders_admin_update" on orders
  for update using (auth.role() = 'authenticated');

create policy "orders_admin_delete" on orders
  for delete using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------
-- ORDER_COUNTERS / ID_SEQUENCES: no direct access for anyone.
-- Only touched internally by the security-definer functions below.
-- ---------------------------------------------------------------
-- (no policies created — RLS enabled with zero policies = fully locked,
--  the functions bypass this because they run as their owner)

-- ---------------------------------------------------------------
-- SETTINGS: everyone can read (banners/offer text are public-facing);
-- only admins can write
-- ---------------------------------------------------------------
create policy "settings_public_read" on settings
  for select using (true);

create policy "settings_admin_write" on settings
  for update using (auth.role() = 'authenticated');

-- =============================================================
-- FUNCTION: generate_order_id()
-- Callable by anyone (needed at checkout, before login).
-- Produces HOR-YYYYMMDD-001, HOR-YYYYMMDD-002, ... per day.
-- =============================================================
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

-- Grant minimal table privileges so the anon role can attempt INSERTs.
-- Row-level policies below control whether the insert is allowed.
grant insert on orders to anon;

-- =============================================================
-- FUNCTION: generate_product_id(prefix)
-- Admin-only (called from the admin panel when adding a product).
-- Produces GOD001, GOD002, ... for a given category prefix.
-- =============================================================
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
  if auth.role() <> 'authenticated' then
    raise exception 'Only admins can generate product IDs';
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
