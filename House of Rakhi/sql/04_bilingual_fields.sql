-- =============================================================
-- HOUSE OF RAKHI — FIELDS THE EXISTING FRONTEND NEEDS
-- Run this AFTER 01_schema.sql, 02_security.sql, 03_admin_lockdown.sql.
--
-- WHY: index.html/products-new.js currently render nameTe,
-- descriptionTe (Telugu text), subcategory, and a per-product discount
-- percentage. The original 01_schema.sql products table has none of
-- these columns. Without this migration, switching the frontend over
-- to read from Supabase would silently lose the Telugu text and
-- discount badges that are already live on the site today.
-- =============================================================

alter table products
  add column if not exists name_te         text default '',
  add column if not exists description_te  text default '',
  add column if not exists subcategory     text default '',
  add column if not exists discount_percent integer not null default 0
    check (discount_percent >= 0 and discount_percent <= 100);
