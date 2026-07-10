
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

const thalis = [
  {
    name: 'Chicken Biryani Thali',
    price: 390,
    description: 'A grand feast featuring our premium Chicken Biryani, served with special gravy, raita, two rotis, salad, and a dessert. The ultimate meal experience.',
    image_url: 'https://images.unsplash.com/photo-1543353071-0970bc973826?auto=format&fit=crop&q=80&w=800',
    category: 'Thali',
    portion_size: 'Full Meal Set',
    is_in_stock: true
  },
  {
    name: 'Chicken Masala Thali',
    price: 190,
    description: 'A complete traditional meal with spicy Chicken Masala, dal, steam rice, two chapatis, cucumber salad, and crunchy papad.',
    image_url: '/assets/thalis/chicken_masala_thali.png',
    category: 'Thali',
    portion_size: 'Full Meal Set',
    is_in_stock: true
  },
  {
    name: 'Eggs Masala Thali',
    price: 170,
    description: 'Wholesome thali featuring Egg Masala (2 eggs), served with daal fry, aromatic rice, two rotis, and fresh salad.',
    image_url: 'https://images.unsplash.com/photo-1601303584126-269425e65d21?auto=format&fit=crop&q=80&w=800',
    category: 'Thali',
    portion_size: 'Full Meal Set',
    is_in_stock: true
  },
  {
    name: 'Fish Thali',
    price: 280,
    description: 'A coastal delight including traditional Fish Curry, crispy fried fish, bhakri/roti, rice, and refreshing solkadhi.',
    image_url: 'https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=800',
    category: 'Thali',
    portion_size: 'Full Meal Set',
    is_in_stock: true
  },
  {
    name: 'Veg Thali',
    price: 150,
    description: 'A balanced vegetarian spread with two seasonal vegetables, yellow dal tadka, steamed rice, two chapatis, curd, and a sweet dish.',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    category: 'Thali',
    portion_size: 'Full Meal Set',
    is_in_stock: true
  }
];

async function insertThalis() {
  console.log('Inserting 5 Thali items...');
  const { data, error } = await supabase
    .from('products')
    .insert(thalis);

  if (error) {
    console.error('Error inserting Thalis:', error);
  } else {
    console.log('Successfully inserted 5 Thali items!');
  }
}

insertThalis();
