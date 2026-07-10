
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

async function finalCleanup() {
  console.log('--- FINAL CLEANUP START ---');
  
  // 1. Delete Signature Mutton Biryani specifically by ID
  const { error: err1 } = await supabase
    .from('products')
    .delete()
    .eq('id', '03113c07-da89-4f61-9de0-4930b36d6f87');
  if (err1) console.error('Error deleting mutton by ID:', err1);
  else console.log('Deleted mutton by ID.');

  // 2. Delete anything with name "Mutton"
  const { error: err2 } = await supabase
    .from('products')
    .delete()
    .ilike('name', '%Mutton%');
  if (err2) console.error('Error deleting mutton items:', err2);
  else console.log('Deleted all items with "Mutton" in name.');

  // 3. Delete anything with category "Mutton" or "Signature"
  const { error: err3 } = await supabase
    .from('products')
    .delete()
    .in('category', ['Mutton', 'Signature']);
  if (err3) console.error('Error deleting categories:', err3);
  else console.log('Deleted Mutton and Signature categories.');

  // 4. Remove duplicate Thalis (keep the ones with custom images)
  // I'll keep the ones created earlier (14:40) and delete the ones created at 15:15
  const { data: duplicates } = await supabase
    .from('products')
    .select('id')
    .eq('category', 'Thali')
    .gt('created_at', '2026-04-20T15:00:00Z');
  
  if (duplicates && duplicates.length > 0) {
    const ids = duplicates.map(d => d.id);
    console.log('Deleting duplicate Thali IDs:', ids);
    await supabase.from('products').delete().in('id', ids);
  }

  console.log('--- FINAL CLEANUP COMPLETE ---');
}

finalCleanup();
