
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

async function deleteMuttonBiryani() {
  console.log('Removing Signature Mutton Biryani...');
  const { error } = await supabase
    .from('products')
    .delete()
    .ilike('name', '%Signature Mutton Biryani%');

  if (error) {
    console.error('Error deleting item:', error);
  } else {
    console.log('Successfully removed Signature Mutton Biryani!');
  }
}

deleteMuttonBiryani();
