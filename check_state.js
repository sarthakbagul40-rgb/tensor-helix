
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

async function checkState() {
  console.log('Checking database state...');
  
  const { data: thalis } = await supabase.from('products').select('*').eq('category', 'Thali');
  console.log('Thalis:', JSON.stringify(thalis, null, 2));

  const { data: mutton } = await supabase.from('products').select('*').ilike('name', '%Mutton%');
  console.log('Mutton items found:', mutton.length);
  if (mutton.length > 0) {
    console.log('Sample Mutton:', JSON.stringify(mutton, null, 2));
  }
}

checkState();
