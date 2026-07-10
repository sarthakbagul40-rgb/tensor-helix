
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

async function cleanupMenu() {
  console.log('Cleaning up Mutton and Signature items...');
  
  // Delete Mutton category items
  const { error: error1 } = await supabase
    .from('products')
    .delete()
    .eq('category', 'Mutton');

  // Delete Signature category items
  const { error: error2 } = await supabase
    .from('products')
    .delete()
    .eq('category', 'Signature');

  // Delete any remaining items with "Mutton" in name
  const { error: error3 } = await supabase
    .from('products')
    .delete()
    .ilike('name', '%Mutton%');

  if (error1 || error2 || error3) {
    console.error('Error during cleanup:', error1 || error2 || error3);
  } else {
    console.log('Cleanup successful!');
  }
}

cleanupMenu();
