-- ============================================================
--  Biryani Restaurant Website — Supabase Schema
--  Run this in the Supabase SQL editor for your project
-- ============================================================

-- ── menu_items ────────────────────────────────────────────
create table if not exists menu_items (
  id               uuid        default gen_random_uuid() primary key,
  category         text        not null,
  name             text        not null,
  description      text,
  price            integer,             -- INR, null if not listed
  is_veg           boolean     not null default false,
  is_chef_special  boolean     not null default false,
  sort_order       integer     not null default 0,
  image_url        text,
  created_at       timestamptz not null default now()
);

-- Enable Row Level Security
alter table menu_items enable row level security;

-- Allow anyone to read the menu
create policy "Public read"
  on menu_items for select
  using (true);

-- ── Seed data ─────────────────────────────────────────────
insert into menu_items (category, name, description, price, is_veg, is_chef_special, sort_order, image_url)
values
  -- Starters
  ('Starters', 'Chicken Fry',           'Golden-fried chicken pieces tossed in house spice blend.', 160, false, false,  1, 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&q=80'),
  ('Starters', 'Chicken Tawa fry',      'Succulent spicy chicken pieces pan-fried on an iron griddle.', 150, false, false,  2, '/images/chicken_tawa_fry.png'),
  ('Starters', 'Chicken Tandoori',      'Marinated overnight in yogurt and spices, char-grilled in clay oven.', 270, false, true,   3, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'),
  ('Starters', 'Single Omelette',     'Fluffy Indian masala omelette with green chilies.', 50, false, false,  4, '/images/omelette.png'),
  ('Starters', 'Double Omelette',     'Thick double fluffy Indian masala omelette.', 90, false, false,  5, '/images/omelette.png'),
  ('Starters', 'Fish Fry',              'Fresh catch of the day, coated in semolina and coastal spices.', 200, false, false,  6, 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80'),
  ('Starters', 'Boil eggs',             'Farm-fresh eggs, soft-boiled and dusted with chaat masala.', 70, true,  false,  7, null),
  ('Starters', 'Plain Maggie',          'Hot, steaming bowl of classic Maggie Noodles.', 60, true,  false,  8, '/images/plain_maggie_v2.png'),
  ('Starters', 'Veg Maggie',            'Maggie Noodles mixed with peas and carrots.', 90, true,  false,  9, '/images/maggie.png'),
  ('Starters', 'Eggs Maggie',           'Maggie Noodles mixed with scrambled eggs.', 120, false, false, 10, '/images/egg_maggie_v2.png'),
  ('Starters', 'Mirchi pakoda(100gm)',  'Crispy golden Mirchi Pakoda.', 70, true,  false, 11, '/images/mirchi_pakoda.png'),

  -- Thalis
  ('Thalis', 'Chicken Biryani Thali', 'Rice, Gravy, Salad, Sweet — a complete feast.', 390, false, true, 20, '/images/biryani-hero-3.png'),
  ('Thalis', 'Chicken Masala Thali',  'Traditional chicken curry Thali with chapati.', 190, false, false, 21, '/images/chicken_thali.png'),
  ('Thalis', 'Eggs Masala thali',     'Egg curry Thali with steamed rice and chapatis.', 170, false, false, 22, '/images/egg_masala_thali.png'),
  ('Thalis', 'Fish Thali',            'Upscale Indian Fish Thali with fried fish and tangy fish curry.', 280, false, true, 23, '/images/fish_thali.png'),
  ('Thalis', 'Veg thali',             'Daily veg, Dal, Rice, Chapati — pure comfort.', 150, true,  false, 24, null),

  -- Main Course
  ('Main Course', 'Chicken Biryani (750gm)', 'Our house specialty, layered with hand-picked spices.', 230, false, true,  30, '/images/biryani-hero-2.png'),
  ('Main Course', 'Chicken Biryani (450gm)', 'Half portion of our house specialty layered with spices.', 140, false, false, 31, '/images/biryani-hero-1.png'),
  ('Main Course', 'Chicken Curry (500ml)',   'Slow-cooked in a rich tomato-onion base.', 180, false, false, 32, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80'),
  ('Main Course', 'Chicken kheema (300ml)',  'Minced chicken sautéed with aromatic spices.', 200, false, false, 33, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80'),
  ('Main Course', 'Green Chicken Gravy(300ml)','A fiery green paste of crushed green chilies and coriander.', 200, false, false, 34, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80'),
  ('Main Course', 'Kharda Chicken (300ml)',  'Spicy green chili chicken cooked in an iron pan.', 220, false, true, 35, '/images/kharda_chicken.png'),
  ('Main Course', 'Fish Curry (500ml)',      'Flaky fish pieces simmered in a tangy coconut gravy.', 200, false, false, 36, '/images/fish_curry.png'),
  ('Main Course', 'Egg Burji (500ml)',       'Spicy scrambled eggs with finely chopped onions.', 150, false, false, 37, '/images/egg_burji.png'),
  ('Main Course', 'Egg Curry (500ml)',       'Rich red Egg Curry.', 170, false, false, 38, '/images/egg_masala_thali.png'),

  -- Add On
  ('Add On', 'Plain Rice Full', 'Fluffy white Plain Basmati Rice.', 90, true, false, 40, '/images/plain_rice.png'),
  ('Add On', 'Plain Rice Half', 'Fluffy white Plain Basmati Rice (Half portion).', 60, true, false, 41, '/images/plain_rice.png'),
  ('Add On', 'Chapati',         'Soft, freshly rolled chapati.', 14, true, false, 42, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80'),
  ('Add On', 'Bhajri bhakri',   'Hot, fresh Indian Bhakri flatbread.', 35, true, false, 43, '/images/bhakri.png'),
  ('Add On', 'Jowri bhakri',    'Hot, fresh Indian Jowri Bhakri flatbread.', 35, true, false, 44, '/images/bhakri.png'),
  ('Add On', 'Nachni bhakri',   'Hot, fresh Indian Nachni Bhakri flatbread.', 35, true, false, 45, '/images/bhakri.png'),
  ('Add On', 'Rice bhakri',     'Hot, fresh Indian Rice Bhakri flatbread.', 30, true, false, 46, '/images/bhakri.png')

on conflict do nothing;

-- ── contact_messages ──────────────────────────────────────
create table if not exists contact_messages (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null,
  phone      text,
  message    text        not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Allow public to insert messages (contact form)
create policy "Public insert"
  on contact_messages for insert
  with check (true);
