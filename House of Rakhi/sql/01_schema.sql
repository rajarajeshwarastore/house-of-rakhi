-- =============================================================
-- HOUSE OF RAKHI — SUPABASE SCHEMA
-- Run this once in Supabase: Project → SQL Editor → New query
-- =============================================================

-- ---------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------
create table if not exists products (
  id           text primary key,              -- 'GOD001', 'DES001', etc — permanent
  name         text not null,
  category     text not null,
  description  text default '',
  price        numeric(10,2) not null default 0,
  stock        integer not null default 0,
  status       text not null default 'In Stock'
               check (status in ('In Stock', 'Limited Stock', 'Out of Stock')),
  tags         text[] default '{}',
  featured     boolean default false,
  premium      boolean default false,
  bestseller   boolean default false,
  new_arrival  boolean default false,
  view_count   integer default 0,
  order_count  integer default 0,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_products_status on products(status);

-- ---------------------------------------------------------------
-- PRODUCT IMAGES (multiple per product)
-- ---------------------------------------------------------------
create table if not exists product_images (
  id           bigint generated always as identity primary key,
  product_id   text not null references products(id) on delete cascade,
  storage_path text not null,     -- path inside the 'product-images' bucket
  sort_order   integer default 0,
  created_at   timestamptz default now()
);

create index if not exists idx_product_images_product on product_images(product_id);

-- ---------------------------------------------------------------
-- PRODUCT ID SEQUENCES — one counter per category prefix
-- e.g. ('GOD', 3) means the next God Rakhi product becomes GOD004
-- ---------------------------------------------------------------
create table if not exists id_sequences (
  prefix   text primary key,
  last_seq integer not null default 0
);

-- ---------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------
create table if not exists orders (
  id               text primary key,           -- 'HOR-20260801-001'
  customer_name    text not null,
  phone            text not null,
  whatsapp_number  text,
  items            jsonb not null,              -- [{product_id, name, qty, price}]
  subtotal         numeric(10,2) default 0,
  delivery_charge  numeric(10,2) default 0,
  total            numeric(10,2) default 0,
  status           text not null default 'Pending'
                   check (status in ('Pending','Packing','Packed','Ready','Delivered','Cancelled')),
  packing_notes    text default '',
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_phone on orders(phone);
create index if not exists idx_orders_created on orders(created_at desc);

-- Per-day counter used to build the HOR-YYYYMMDD-### suffix
create table if not exists order_counters (
  order_date date primary key,
  last_seq   integer not null default 0
);

-- ---------------------------------------------------------------
-- SETTINGS — single row, edited from the admin panel
-- ---------------------------------------------------------------
create table if not exists settings (
  id               integer primary key default 1,
  store_name       text default 'House of Rakhi by Shri Rajarajeshwara Rakhi Store',
  whatsapp_number  text default '910000000000',
  instagram_link   text default 'https://instagram.com',
  address          text default 'Old Market, Near Hanuman Temple, Vemulawada, Telangana',
  homepage_banner  jsonb default '{}',
  festival_banner  jsonb default '{}',
  offer_text       text default '',
  updated_at       timestamptz default now(),
  constraint single_settings_row check (id = 1)
);

insert into settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------
-- updated_at auto-touch trigger (products, orders, settings)
-- ---------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated on products;
create trigger trg_products_updated before update on products
  for each row execute function set_updated_at();

drop trigger if exists trg_orders_updated on orders;
create trigger trg_orders_updated before update on orders
  for each row execute function set_updated_at();

drop trigger if exists trg_settings_updated on settings;
create trigger trg_settings_updated before update on settings
  for each row execute function set_updated_at();
