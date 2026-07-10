
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple env parser
const envContent = fs.readFileSync(path.resolve(__dirname, '.env.local'), 'utf8');
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim();
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

const supabase = createClient(supabaseUrl, supabaseKey);

const starters = [
  {
    name: 'Chicken fry',
    price: 160,
    description: 'Succulent chicken pieces marinated in a blend of traditional spices and deep-fried to a perfect golden crisp. A classic crunch in every bite.',
    image_url: '/assets/starters/chicken_fry.png',
    category: 'Starter',
    portion_size: 'Regular',
    is_in_stock: true
  },
  {
    name: 'Chicken Tawa fry',
    price: 150,
    description: 'Boneless chicken seasoned with a fiery masala mix, sizzled on a flat griddle with onions and aromatic herbs for an authentic street-side flavor.',
    image_url: '/assets/starters/chicken_tawa_fry.png',
    category: 'Starter',
    portion_size: 'Regular',
    is_in_stock: true
  },
  {
    name: 'Chicken Tandoori',
    price: 270,
    description: 'The crown jewel of Indian starters. Half chicken marinated in yogurt and secret tandoori spices, slow-roasted in a clay oven for a smoky, tender finish.',
    image_url: '/assets/starters/chicken_tandoori.png',
    category: 'Starter',
    portion_size: 'Half',
    is_in_stock: true
  },
  {
    name: 'Single Omelette',
    price: 50,
    description: 'A light and airy single-egg wonder, whisked with fresh onions, green chilies, and a touch of black pepper. Simple, classic, and satisfying.',
    image_url: '/assets/starters/single_omelette.png',
    category: 'Starter',
    portion_size: '1 Egg',
    is_in_stock: true
  },
  {
    name: 'Double Omelette',
    price: 90,
    description: 'A double-dose of protein. Two farm-fresh eggs folded into a hearty omelette with crisp veggies and savory spices. The perfect power starter.',
    image_url: '/assets/starters/double_omelette.png',
    category: 'Starter',
    portion_size: '2 Eggs',
    is_in_stock: true
  },
  {
    name: 'Fish Fry',
    price: 200,
    description: 'Premium fish fillets coated in a rich, spicy masala paste and shallow-fried until the skin is perfectly crisp while the meat remains melt-in-your-mouth tender.',
    image_url: '/assets/starters/fish_fry.png',
    category: 'Starter',
    portion_size: '2 Pcs',
    is_in_stock: true
  },
  {
    name: 'Boil eggs',
    price: 70,
    description: 'Two perfectly hard-boiled farm eggs, sliced and lightly seasoned with sea salt and cracked black pepper. A healthy, protein-packed beginning.',
    image_url: '/assets/starters/boil_eggs.png',
    category: 'Starter',
    portion_size: '2 Eggs',
    is_in_stock: true
  },
  {
    name: 'Plain Maggie',
    price: 60,
    description: 'The ultimate comfort food. Classic yellow noodles cooked to perfection in a flavorful aromatic broth. Childhood nostalgia in a bowl.',
    image_url: '/assets/starters/plain_maggie.png',
    category: 'Starter',
    portion_size: 'Regular',
    is_in_stock: true
  },
  {
    name: 'Veg Maggie',
    price: 90,
    description: 'Elevated instant noodles tossed with a colorful medley of fresh carrots, green peas, and sweet corn, infused with our signature spice blend.',
    image_url: '/assets/starters/veg_maggie.png',
    category: 'Starter',
    portion_size: 'Regular',
    is_in_stock: true
  },
  {
    name: 'Eggs Maggie',
    price: 120,
    description: 'Our signature noodles topped with a velvet-smooth fried egg and scrambled egg bits for an extra layer of richness and texture.',
    image_url: '/assets/starters/eggs_maggie.png',
    category: 'Starter',
    portion_size: 'Regular',
    is_in_stock: true
  },
  {
    name: 'Mirchi pakoda',
    price: 70,
    description: 'Long, spicy green chilies dipped in a savory gram flour batter and deep-fried until golden. A bold, fiery treat for the brave.',
    image_url: '/assets/starters/mirchi_pakoda.png',
    category: 'Starter',
    portion_size: '100gm',
    is_in_stock: true
  }
];

async function insertStarters() {
  console.log('Starting insertion of 11 starters...');
  
  const { data, error } = await supabase
    .from('products')
    .insert(starters);

  if (error) {
    console.error('Error inserting starters:', error);
  } else {
    console.log('Successfully inserted 11 starters into the database!');
  }
}

insertStarters();
