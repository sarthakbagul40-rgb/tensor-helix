
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

async function findItem(name) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${name}%`);

  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log(`Search for "${name}":`, JSON.stringify(data, null, 2));
  }
}

async function run() {
  await findItem('Fish Fry');
  await findItem('Chicken Kheema');
  await findItem('Green Chicken');
  await findItem('Kharda');
  await findItem('Egg Burji');
  await findItem('Egg Curry');
}

run();
