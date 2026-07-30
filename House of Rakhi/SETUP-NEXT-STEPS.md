# House of Rakhi — What Changed & What To Do Next

## What's already done (before this update)
- Supabase project configured, schema + security + admin lockdown + bilingual fields SQL executed.
- Admin user created for rajarajeshwarastore@gmail.com, public sign-ups disabled.

## What this update adds

### 1. Frontend connected to Supabase
- `supabase-config.js` — holds the Project URL + publishable key, creates one shared `window.supabaseClient` used by both the storefront and the admin panel. (The publishable key is safe to expose — it's the same as the old "anon key," and it can only do what your RLS policies allow.)
- `index.html` now loads the Supabase JS SDK + `supabase-config.js` in `<head>`, before `products-new.js`.
- `products-new.js` still shows the original 24 built-in demo products **immediately** (so the page is never blank), then quietly fetches the live rows from your `products` table in the background and swaps them in once they arrive — along with each product's photo from Storage, if one has been uploaded. If Supabase is ever unreachable, the page just keeps showing the demo data instead of breaking.
- No visual/UI changes were made to `index.html`, `style.css`, or `script.js` — only the two additive pieces above, plus one small change so WhatsApp order messages show the real product ID (e.g. `GOD001`) instead of the on-page display number.

### 2. The 24 demo products, ready to import
- `05_seed_products.sql` — run this once in the Supabase SQL Editor. It inserts the same 24 products already in `products-new.js`, with permanent IDs like `GOD001`, `DES001`, etc. (matching the scheme in the original `seed-products.mjs`). It's safe to re-run — it upserts by ID rather than duplicating rows.
- This replaces the need to run `seed-products.mjs` with Node — no service_role key or npm install required, just paste-and-run SQL. (The original script is still there if you ever prefer that route.)

### 3. `admin.html` — a completely separate admin page
- Not linked anywhere on the public site — no navbar link, no footer link, nothing in `index.html` references it. You (or your team) reach it only by typing the URL directly, e.g. `yoursite.com/admin.html`.
- Marked `noindex, nofollow` so search engines won't list it.
- Requires a real Supabase Auth login (email + password) — only `rajarajeshwarastore@gmail.com` is accepted; any other login is signed out immediately by the admin panel itself, on top of the RLS policies that already restrict writes to that email.
- Once logged in:
  - **Products tab** — search, add, edit, delete products; toggle Premium/Bestseller/New/Featured/Handmade/Designer/God Rakhi/Wholesale; set price, stock, status, discount %, bilingual name/description; upload a product photo.
  - **Orders tab** — view orders placed through the site and update their status (Pending → Packing → Packed → Ready → Delivered/Cancelled).
- `admin.js` contains all the logic; `admin.html` is just markup + styling matching the store's maroon/gold theme (kept separate from the public site's CSS, as requested).

### 4. `06_storage_setup.sql` — optional, for real product photos
- Creates the `product-images` Storage bucket (public read, admin-only write) that the admin panel's photo upload feature needs.
- Not required for the site to work — until you run this and upload photos, products just keep showing the existing placeholder images, exactly as they do today.

## What YOU still need to do

1. **Run the SQL** (Supabase Dashboard → SQL Editor), in order:
   - `05_seed_products.sql` — imports the 24 products.
   - `06_storage_setup.sql` — only when you're ready to upload real photos.
2. **Replace the placeholder files** listed in the original `README.md` (phone/WhatsApp number, logo, store photo, Google Maps link) — unchanged from before, still needed.
3. **Deploy** `index.html`, `admin.html`, and all the supporting files (`supabase-config.js`, `products-new.js`, `admin.js`, `style.css`, `script.js`, images) to your hosting as one folder — `admin.html` needs to live alongside the rest for its relative links to `supabase-config.js`/`admin.js`/`style.css`-equivalent to resolve.
4. **Bookmark the admin URL** somewhere private (password manager, internal notes) — since it's intentionally not linked from the site, you'll need to type or bookmark `/admin.html` yourself.
5. Log in to `/admin.html` with the admin account you already created in Supabase Auth.

## Files in this delivery
```
index.html              (updated — Supabase-connected, no UI/design changes)
products-new.js         (updated — now fetches live data, demo data as fallback)
supabase-config.js       (new — shared Supabase client)
admin.html               (new — standalone admin page, not linked anywhere)
admin.js                 (new — admin panel logic)
05_seed_products.sql     (new — imports the 24 demo products)
06_storage_setup.sql     (new — optional, product photo storage bucket)
style.css, script.js, logo files, god images/   (unchanged)
```
