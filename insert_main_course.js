
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

const mainCourse = [
  {
    name: 'Chicken Biryani (Full)',
    price: 230,
    description: 'A grand serving of our legendary Chicken Biryani. Long-grain Basmati rice layered with succulent chicken and aromatic dum spices.',
    image_url: '/assets/main_course/chicken_biryani_full.png',
    category: 'Main Course',
    portion_size: '750gm',
    is_in_stock: true
  },
  {
    name: 'Chicken Biryani (Half)',
    price: 140,
    description: 'The perfect personal portion of our fragrant Chicken Biryani, slow-cooked to perfection with tender meat and premium rice.',
    image_url: '/assets/main_course/chicken_biryani_half.png',
    category: 'ARCHIVED',
    portion_size: '450gm',
    is_in_stock: true
  },
  {
    name: 'Chicken Curry',
    price: 180,
    description: 'Home-style chicken curry cooked in a rich, spicy tomato-onion base. Comforting, aromatic, and perfectly balanced.',
    image_url: '/assets/main_course/chicken_curry.png',
    category: 'Main Course',
    portion_size: '500gm',
    is_in_stock: true
  },
  {
    name: 'Chicken Kheema',
    price: 200,
    description: 'Minced chicken cooked with peas and traditional spices. A savory, high-protein delight that pairs perfectly with roti or pav.',
    image_url: 'https://images.unsplash.com/photo-1543353071-0970bc973826?auto=format&fit=crop&q=80&w=800',
    category: 'Main Course',
    portion_size: '300gm',
    is_in_stock: true
  },
  {
    name: 'Green Chicken Gravy',
    price: 200,
    description: 'A vibrant and aromatic chicken dish cooked in a fresh cilantro and mint based gravy. Refreshing yet deeply flavorful.',
    image_url: 'https://images.unsplash.com/photo-1603894584114-f033100647c0?auto=format&fit=crop&q=80&w=800',
    category: 'Main Course',
    portion_size: '300gm',
    is_in_stock: true
  },
  {
    name: 'Kharda Chicken',
    price: 220,
    description: 'Authentic Maharashtrian style chicken cooked with a fiery green chili and garlic paste (Kharda). Bold and intensely spicy.',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b11ae494bf?auto=format&fit=crop&q=80&w=800',
    category: 'Main Course',
    portion_size: '300gm',
    is_in_stock: true
  },
  {
    name: 'Fish Curry',
    price: 200,
    description: 'A coastal masterpiece. Fresh fish steaks simmered in a spicy, tangy coconut-based gravy that brings the taste of the sea to your plate.',
    image_url: 'https://images.unsplash.com/photo-1599043513900-36746881c161?auto=format&fit=crop&q=80&w=800',
    category: 'Main Course',
    portion_size: '500gm',
    is_in_stock: true
  },
  {
    name: 'Egg Burji',
    price: 150,
    description: 'Four farm-fresh eggs scrambled with finely chopped onions, tomatoes, and green chilies. A spicy and satisfying classic.',
    image_url: 'https://images.unsplash.com/photo-1610444391629-6887532d1d6a?auto=format&fit=crop&q=80&w=800',
    category: 'Main Course',
    portion_size: '500gm',
    is_in_stock: true
  },
  {
    name: 'Egg Curry',
    price: 170,
    description: 'Classic comfort. Hard-boiled eggs swimming in a savory, well-spiced tomato and onion gravy.',
    image_url: 'https://images.unsplash.com/photo-1601303584126-269425e65d21?auto=format&fit=crop&q=80&w=800',
    category: 'Main Course',
    portion_size: '500gm',
    is_in_stock: true
  }
];

async function insertMainCourse() {
  console.log('Inserting 9 Main Course items...');
  const { data, error } = await supabase
    .from('products')
    .insert(mainCourse);

  if (error) {
    console.error('Error inserting Main Course:', error);
  } else {
    console.log('Successfully inserted 9 Main Course items!');
  }
}

insertMainCourse();
