-- ================================================
-- DELICIOUS BIRYANI — RLS SECURITY FIX
-- Run this in Supabase Dashboard > SQL Editor
-- ================================================

-- 1. PRODUCTS TABLE: Allow public read, block anon write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (safe to run)
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Admin insert products" ON products;
DROP POLICY IF EXISTS "Admin update products" ON products;
DROP POLICY IF EXISTS "Admin delete products" ON products;

-- Anyone can read the menu
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

-- Only logged-in users can insert (admin control via app logic)
CREATE POLICY "Admin insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Only logged-in users can update
CREATE POLICY "Admin update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Only logged-in users can delete
CREATE POLICY "Admin delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');


-- 2. ORDERS TABLE: Users can only read/write their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own orders" ON orders;
DROP POLICY IF EXISTS "Users insert own orders" ON orders;
DROP POLICY IF EXISTS "Users update own orders" ON orders;

-- Users can only see their own orders
CREATE POLICY "Users read own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only create orders for themselves
CREATE POLICY "Users insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update only their own orders (e.g. cancel)
CREATE POLICY "Users update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);


-- 3. ADDRESSES TABLE: Verify RLS is already active (it should be)
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own addresses" ON addresses;
DROP POLICY IF EXISTS "Users insert own addresses" ON addresses;
DROP POLICY IF EXISTS "Users delete own addresses" ON addresses;

CREATE POLICY "Users read own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);


-- ================================================
-- DONE! All tables now have Row Level Security.
-- ================================================
