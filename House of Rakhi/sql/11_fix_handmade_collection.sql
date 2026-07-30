-- =============================================================
-- FIX 11 — Handmade Collection empty (data-only fix)
-- Safe to run multiple times. Only touches `products` rows that
-- are category = 'Handmade Rakhi' or already carry the 'handmade'
-- tag. No other category, no RLS/grant/table changes, no UI files.
-- Run this in Supabase Dashboard -> SQL Editor -> New query.
-- =============================================================

begin;

-- ---------------------------------------------------------------
-- (a) Self-heal: add the 'handmade' tag to any product that is
-- already categorized "Handmade Rakhi" in the admin panel but is
-- missing the tag (e.g. added/edited without ticking the separate
-- "Handmade" checkbox). Only the tags array is touched.
-- ---------------------------------------------------------------
update public.products
set tags = array_append(coalesce(tags, '{}'), 'handmade')
where category = 'Handmade Rakhi'
  and not ('handmade' = any(coalesce(tags, '{}')));

-- ---------------------------------------------------------------
-- (b) Safety net: guarantee at least the 4 original Handmade Rakhi
-- sample products exist and carry the 'handmade' tag. Upsert by id
-- (same ids/data as sql/05_seed_products.sql) -- a no-op on fields
-- for rows that already exist and match, and only patches the tag
-- if it was missing.
-- ---------------------------------------------------------------
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
  tags = case when 'handmade' = any(coalesce(products.tags, '{}')) then products.tags
              else array_append(coalesce(products.tags, '{}'), 'handmade') end;

insert into id_sequences (prefix, last_seq) values ('HAN', 4)
on conflict (prefix) do update set
  last_seq = greatest(id_sequences.last_seq, excluded.last_seq);

commit;

-- ---------------------------------------------------------------
-- VERIFICATION (run after the block above, read-only)
-- ---------------------------------------------------------------
-- select id, name, category, tags
-- from products
-- where 'handmade' = any(coalesce(tags, '{}'))
-- order by id;
--
-- Expect at least 4 rows (HAN001-HAN004). If you had already added
-- other Handmade Rakhi products of your own in the admin panel,
-- they'll show up here too, now that the tag has been added.
-- =============================================================
