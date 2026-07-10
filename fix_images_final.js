
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

async function updateImagesFinal() {
  console.log('Applying final image visibility fixes...');
  
  const updates = [
    { name: 'Chicken Kheema', url: '/assets/main_course/chicken_kheema.png' },
    { name: 'Green Chicken Gravy', url: '/assets/main_course/green_chicken_gravy.png' },
    { name: 'Kharda Chicken', url: '/assets/main_course/kharda_chicken.png' },
    { name: 'Egg Curry', url: '/assets/main_course/egg_curry.png' },
    // Use high-quality external fallbacks for the 2 remaining quota-limited items
    { name: 'Egg Burji', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
    { name: 'Fish Curry', url: 'https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=800' }
  ];

  for (const item of updates) {
    const { error } = await supabase
      .from('products')
      .update({ image_url: item.url })
      .ilike('name', `%${item.name}%`);
    
    if (error) {
      console.error(`Error updating ${item.name}:`, error);
    } else {
      console.log(`Successfully updated ${item.name}`);
    }
  }
}

updateImagesFinal();
