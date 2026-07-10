
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

const [,, name, url] = process.argv;

if (!name || !url) {
  console.error('Usage: node update_item.js "Item Name" "Image URL"');
  process.exit(1);
}

async function updateItem() {
  console.log(`Updating ${name} with ${url}...`);
  const { error } = await supabase
    .from('products')
    .update({ image_url: url })
    .ilike('name', `%${name}%`);

  if (error) {
    console.error(`Error updating ${name}:`, error);
  } else {
    console.log(`Successfully updated ${name}!`);
  }
}

updateItem();
