-- =============================================================
-- HOUSE OF RAKHI — PRODUCT PHOTO STORAGE BUCKET
-- Run this in Supabase: Project -> SQL Editor -> New query
-- Only needed once you're ready to upload real product photos from
-- admin.html. The site and admin panel work fine without it —
-- product cards just keep using the built-in placeholder images
-- until a bucket exists.
--
-- Run this AFTER 03_admin_lockdown.sql (it reuses the same admin
-- email check).
-- =============================================================

-- Public bucket: anyone can view photos (needed for the storefront),
-- only the admin can upload/replace/delete them.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_bucket_public_read" on storage.objects;
create policy "product_images_bucket_public_read" on storage.objects
  for select
  using (bucket_id = 'product-images');

drop policy if exists "product_images_bucket_admin_write" on storage.objects;
create policy "product_images_bucket_admin_write" on storage.objects
  for insert
  with check (
    bucket_id = 'product-images'
    and (auth.jwt() ->> 'email') = 'rajarajeshwarastore@gmail.com'
  );

drop policy if exists "product_images_bucket_admin_update" on storage.objects;
create policy "product_images_bucket_admin_update" on storage.objects
  for update
  using (
    bucket_id = 'product-images'
    and (auth.jwt() ->> 'email') = 'rajarajeshwarastore@gmail.com'
  );

drop policy if exists "product_images_bucket_admin_delete" on storage.objects;
create policy "product_images_bucket_admin_delete" on storage.objects
  for delete
  using (
    bucket_id = 'product-images'
    and (auth.jwt() ->> 'email') = 'rajarajeshwarastore@gmail.com'
  );
