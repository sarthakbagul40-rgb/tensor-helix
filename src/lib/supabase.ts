import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ─────────────────────────────────────────────────

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string | null;
  price: number | null;
  is_veg: boolean;
  is_chef_special: boolean;
  sort_order: number;
  image_url: string | null;
};

export type ContactMessage = {
  name: string;
  phone: string;
  message: string;
};

import { STATIC_MENU } from "./menu-data";

// ── Queries ───────────────────────────────────────────────

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("[Supabase] getMenuItems error, falling back to static data:", error.message);
      return STATIC_MENU;
    }
    
    // If table is empty, also fallback
    if (!data || data.length === 0) {
      console.info("[Supabase] No items found in DB, using static data.");
      return STATIC_MENU;
    }

    return data;
  } catch (err) {
    console.error("[Supabase] Unexpected error in getMenuItems:", err);
    return STATIC_MENU;
  }
}

export async function sendContactMessage(
  payload: ContactMessage
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("contact_messages")
    .insert([payload]);

  if (error) {
    console.error("[Supabase] sendContactMessage error:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}
