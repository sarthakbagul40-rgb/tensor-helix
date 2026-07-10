
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple env parser
const envFile = path.resolve(__dirname, '.env.local');
if (!fs.existsSync(envFile)) {
  console.error('.env.local not found');
  process.exit(1);
}
const envContent = fs.readFileSync(envFile, 'utf8');
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim();
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Current Products count:', data.length);
    console.log('Current Categories:', [...new Set(data.map(d => d.category))]);
    console.log('Sample Products:', JSON.stringify(data.slice(0, 5), null, 2));
  }
}

checkProducts();
