
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

async function cleanupBiryanis() {
  console.log('Cleaning up existing Biryani placeholders...');
  
  // We'll delete any item that has "Biryani" in the name and is NOT a starter (to be safe)
  const { data, error } = await supabase
    .from('products')
    .delete()
    .ilike('name', '%Biryani%')
    .neq('category', 'Starter');

  if (error) {
    console.error('Error cleaning up Biryanis:', error);
  } else {
    console.log('Cleanup successful!');
  }
}

cleanupBiryanis();
