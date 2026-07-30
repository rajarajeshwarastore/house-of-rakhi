// =============================================================
// HOUSE OF RAKHI — SUPABASE CONFIG
// Shared by index.html (storefront) and admin.html (admin panel).
//
// This is the "publishable" (anon) key — it is SAFE to expose in
// frontend code. It can only do what the RLS policies in
// 02_security.sql / 03_admin_lockdown.sql allow: public read on
// products/settings, public insert on orders, and — for products,
// product_images, orders (read/update/delete) and settings writes —
// only when the request carries a valid login session for
// rajarajeshwarastore@gmail.com. Never put the service_role key here.
// =============================================================

const SUPABASE_URL = 'https://qrmaqziiiqueegoyvnnp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_kVBVFY_OFbhHB_KiKv-7Dw_rkdV60FI';

// supabase-js UMD build is loaded via <script> tag before this file
// (see index.html / admin.html <head>), which exposes window.supabase.
if (!window.supabaseClient && window.supabase?.createClient) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
