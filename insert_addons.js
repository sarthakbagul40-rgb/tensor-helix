
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = fs.readFileSync(path.resolve(__dirname, '.env.local'), 'utf8');
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim();
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

const supabase = createClient(supabaseUrl, supabaseKey);

const addons = [
  {
    name: 'Plain Rice (Full)',
    price: 90,
    description: 'A large bowl of perfectly steamed Basmati rice, soft and fluffy.',
    image_url: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800',
    category: 'Add-ons',
    portion_size: 'Full Bowl',
    is_in_stock: true
  },
  {
    name: 'Plain Rice (Half)',
    price: 60,
    description: 'A half-portion bowl of our aromatic steamed Basmati rice.',
    image_url: 'https://images.unsplash.com/photo-1543353071-0970bc973826?auto=format&fit=crop&q=80&w=800',
    category: 'Add-ons',
    portion_size: 'Half Bowl',
    is_in_stock: true
  },
  {
    name: 'Chapati',
    price: 14,
    description: 'Freshly made soft whole wheat flatbread, served hot.',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    category: 'Add-ons',
    portion_size: '1 Pc',
    is_in_stock: true
  },
  {
    name: 'Bhajri bhakri',
    price: 35,
    description: 'Traditional thick Bhakri made from Pearl Millet (Bajra) flour.',
    image_url: '/assets/addons/bhakri.png',
    category: 'Add-ons',
    portion_size: '1 Pc',
    is_in_stock: true
  },
  {
    name: 'Jowri bhakri',
    price: 35,
    description: 'Hand-patted Bhakri made from Sorghum (Jowar) flour.',
    image_url: '/assets/addons/bhakri.png',
    category: 'Add-ons',
    portion_size: '1 Pc',
    is_in_stock: true
  },
  {
    name: 'Nachni bhakri',
    price: 35,
    description: 'Nutritious Bhakri made from Finger Millet (Ragi/Nachni) flour.',
    image_url: '/assets/addons/bhakri.png',
    category: 'Add-ons',
    portion_size: '1 Pc',
    is_in_stock: true
  },
  {
    name: 'Rice bhakri',
    price: 30,
    description: 'Traditional Tandalachi Bhakri made from rice flour.',
    image_url: '/assets/addons/bhakri.png',
    category: 'Add-ons',
    portion_size: '1 Pc',
    is_in_stock: true
  }
];

async function insertAddOns() {
  console.log('Inserting 7 Add-on items...');
  const { data, error } = await supabase
    .from('products')
    .insert(addons);

  if (error) {
    console.error('Error inserting Add-ons:', error);
  } else {
    console.log('Successfully inserted 7 Add-on items!');
  }
}

insertAddOns();
