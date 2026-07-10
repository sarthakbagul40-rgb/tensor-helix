
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

async function absoluteCleanup() {
  console.log('--- ABSOLUTE CLEANUP ---');
  
  // 1. Delete all Thalis and re-insert 5 clean ones
  console.log('Clearing all Thalis...');
  await supabase.from('products').delete().eq('category', 'Thali');

  // 2. Delete all Mutton/Signature
  console.log('Clearing all Mutton/Signature items...');
  await supabase.from('products').delete().ilike('category', '%Mutton%');
  await supabase.from('products').delete().ilike('category', '%Signature%');
  await supabase.from('products').delete().ilike('name', '%Mutton%');
  await supabase.from('products').delete().eq('id', '03113c07-da89-4f61-9de0-4930b36d6f87');

  // 3. Re-insert the 5 proper thalis
  const thalis = [
    {
      name: 'Chicken Biryani Thali',
      price: 390,
      description: 'A grand feast featuring our premium Chicken Biryani, served with special gravy, raita, two rotis, salad, and a dessert.',
      image_url: '/assets/thalis/chicken_biryani_thali.jpg',
      category: 'Thali',
      portion_size: 'Full Meal Set',
      is_in_stock: true
    },
    {
      name: 'Chicken Masala Thali',
      price: 190,
      description: 'A complete traditional meal with spicy Chicken Masala, dal, steam rice, two chapatis, salad, and papad.',
      image_url: '/assets/thalis/chicken_masala_thali.jpg',
      category: 'Thali',
      portion_size: 'Full Meal Set',
      is_in_stock: true
    },
    {
      name: 'Eggs Masala Thali',
      price: 170,
      description: 'Wholesome thali featuring Egg Masala (2 eggs), served with daal fry, aromatic rice, two rotis, and fresh salad.',
      image_url: '/assets/thalis/eggs_masala_thali.jpg',
      category: 'Thali',
      portion_size: 'Full Meal Set',
      is_in_stock: true
    },
    {
      name: 'Fish Thali',
      price: 280,
      description: 'A coastal delight including traditional Fish Curry, crispy fried fish, bhakri/roti, rice, and refreshing solkadhi.',
      image_url: '/assets/thalis/fish_thali.jpg',
      category: 'Thali',
      portion_size: 'Full Meal Set',
      is_in_stock: true
    },
    {
      name: 'Veg Thali',
      price: 150,
      description: 'A balanced vegetarian spread with two seasonal vegetables, yellow dal tadka, steamed rice, two chapatis, curd, and a sweet dish.',
      image_url: '/assets/thalis/veg_thali.jpg',
      category: 'Thali',
      portion_size: 'Full Meal Set',
      is_in_stock: true
    }
  ];

  console.log('Inserting clean Thalis...');
  await supabase.from('products').insert(thalis);

  // 4. Verify
  const { data: final } = await supabase.from('products').select('*');
  const counts = final.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Final Category Counts:', counts);
  console.log('Remaining Mutton Items:', final.filter(i => i.name.includes('Mutton')).length);
}

absoluteCleanup();
