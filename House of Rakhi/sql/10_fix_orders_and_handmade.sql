-- =============================================================
-- FIX 10 — Orders insert permission (authenticated role) +
--          Handmade Collection empty
-- Safe to run multiple times. Only touches `orders` grants/policy
-- and `products` rows tagged/categorized as Handmade Rakhi.
-- Run this in Supabase Dashboard -> SQL Editor -> New query.
-- =============================================================

begin;

-- ---------------------------------------------------------------
-- PROBLEM 1 ROOT CAUSE:
-- The orders table has RLS policy "orders_public_insert" which
-- already allows inserts from ANY role (`with check (true)`, no
-- `to` clause). But a Postgres RLS policy only ever gets evaluated
-- AFTER the role has table-level GRANT privilege. Earlier
-- migrations (02/03/07/08) only ran `grant insert on orders to
-- anon` — they never granted it to `authenticated`.
--
-- The storefront and the admin panel share one Supabase client
-- and one browser localStorage session. If this browser has ever
-- logged into /admin.html, the same session (role = authenticated)
-- is still attached when a customer places an order from the
-- storefront on that same browser. That request is executed as
-- `authenticated`, which had no INSERT grant -> 42501 permission
-- denied. This is not a guess: it matches the exact GRANT the
-- Postgres error hinted at.
--
-- Fix: grant INSERT to BOTH roles, so it works regardless of
-- which session happens to be active in the browser.
-- ---------------------------------------------------------------
alter table if exists public.orders enable row level security;

grant insert on public.orders to anon;
grant insert on public.orders to authenticated;

drop policy if exists orders_public_insert on public.orders;
create policy orders_public_insert on public.orders
  for insert
  with check (true);

commit;

-- ---------------------------------------------------------------
-- PROBLEM 2 ROOT CAUSE:
-- The homepage "Handmade Collection" section (renderHandmadeCollection
-- in index.html) filters products by the isHandmade FLAG, which is
-- derived from products.tags containing the string 'handmade'
-- (see mapTagsToFlags in products-new.js). It does NOT filter by
-- products.category. So a product can be categorized "Handmade
-- Rakhi" in the admin panel and still be invisible in this section
-- if the separate "Handmade" tag checkbox wasn't ticked when the
-- product was added/edited.
--
-- Fix, in two idempotent parts:
--  (a) Self-heal: any existing product already categorized as
--      "Handmade Rakhi" that is missing the 'handmade' tag gets it
--      added, without touching any other tags or fields.
--  (b) Safety net: upsert the 4 original Handmade Rakhi sample
--      products (same IDs/data as sql/05_seed_products.sql) in case
--      none exist yet in this project. Upsert by id, so if they
--      already exist this is a no-op change to those rows only.
-- Only `products` rows in the Handmade Rakhi category are touched;
-- every other category is untouched.
-- ---------------------------------------------------------------
begin;

update public.products
set tags = array_append(tags, 'handmade')
where category = 'Handmade Rakhi'
  and not ('handmade' = any(tags));

insert into products (
  id, name, name_te, category, subcategory, description, description_te,
  price, stock, status, tags, featured, premium, bestseller, new_arrival,
  discount_percent
) values
  ('HAN001', 'Handcrafted Lotus Rakhi', 'చేతితో చేసిన లోటస్ రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'A traditional handmade piece with devotional charm and artisan detail.', 'ఆధ్యాత్మిక శోభతో కూడిన చేతితో చేసిన రఖీ.', 219, 70, 'In Stock', ARRAY['new','handmade','wholesale']::text[], false, false, false, true, 13),
  ('HAN002', 'Saffron Thread Rakhi', 'కుంకుమ థ్రెడ్ రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'A warm handcrafted rakhi infused with a festive saffron spirit.', 'పండుగ శైలికి అనుగుణంగా రూపొందించిన చేతితో చేసిన రఖీ.', 159, 70, 'In Stock', ARRAY['handmade']::text[], false, false, false, false, 16),
  ('HAN003', 'Traditional Temple Rakhi', 'సాంప్రదాయ దేవాలయ రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'A temple-inspired handmade rakhi that carries warmth and devotion.', 'దేవాలయ శైలిలో రూపొందించిన చేతితో చేసిన రఖీ.', 199, 70, 'In Stock', ARRAY['handmade']::text[], false, false, false, false, 13),
  ('HAN004', 'Cultural Charm Rakhi', 'సాంస్కృతిక మాధుర్య రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'Handcrafted charm with bold color and warm cultural storytelling.', 'శక్తివంతమైన రంగులు మరియు సాంస్కృతిక కథతో నిండిన చేతితో చేసిన రఖీ.', 219, 70, 'Out of Stock', ARRAY['handmade']::text[], false, false, false, false, 25)
on conflict (id) do update set
  tags = case when 'handmade' = any(products.tags) then products.tags
              else array_append(products.tags, 'handmade') end;

insert into id_sequences (prefix, last_seq) values ('HAN', 4)
on conflict (prefix) do update set
  last_seq = greatest(id_sequences.last_seq, excluded.last_seq);

commit;

-- ---------------------------------------------------------------
-- VERIFICATION QUERIES (run these after the above, read-only)
-- ---------------------------------------------------------------
-- 1. Confirm both roles can now insert (RLS + grant):
--    select grantee, privilege_type from information_schema.role_table_grants
--    where table_name = 'orders' and privilege_type = 'INSERT';
--    -> should list both anon and authenticated
--
-- 2. Confirm Handmade Collection has data:
--    select id, name, category, tags from products
--    where 'handmade' = any(tags);
--    -> should return at least the 4 HAN00x rows
-- =============================================================
