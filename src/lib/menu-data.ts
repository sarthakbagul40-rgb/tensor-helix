import { MenuItem } from "./supabase";

export const STATIC_MENU: MenuItem[] = [
  // ── Starters ──────────────────────────────────────────────

  {
    id: "s2", category: "Starters", name: "Chicken Tawa fry", description: "Succulent spicy chicken pieces pan-fried on an iron griddle.", price: 150, is_veg: false, is_chef_special: false, sort_order: 2,
    image_url: "/images/chicken_tawa_fry.png",
  },
  {
    id: "s3", category: "Starters", name: "Chicken Tandoori", description: "Marinated overnight in yogurt and spices, char-grilled in clay oven.", price: 270, is_veg: false, is_chef_special: true, sort_order: 3,
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
  },
  {
    id: "s4", category: "Starters", name: "Single Omelette", description: "Fluffy Indian masala omelette with green chilies.", price: 50, is_veg: false, is_chef_special: false, sort_order: 4,
    image_url: "/images/omelette.png",
  },
  {
    id: "s5", category: "Starters", name: "Double Omelette", description: "Thick double fluffy Indian masala omelette.", price: 90, is_veg: false, is_chef_special: false, sort_order: 5,
    image_url: "/images/omelette.png",
  },
  {
    id: "s6", category: "Starters", name: "Fish Fry", description: "Fresh catch of the day, coated in semolina and coastal spices.", price: 200, is_veg: false, is_chef_special: false, sort_order: 6,
    image_url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
  },
  {
    id: "s7", category: "Starters", name: "Boil eggs", description: "Farm-fresh eggs, soft-boiled and dusted with chaat masala.", price: 70, is_veg: true, is_chef_special: false, sort_order: 7,
    image_url: null,
  },
  {
    id: "s8", category: "Starters", name: "Plain Maggie", description: "Hot, steaming bowl of classic Maggie Noodles.", price: 60, is_veg: true, is_chef_special: false, sort_order: 8,
    image_url: "/images/plain_maggie_v2.png",
  },
  {
    id: "s9", category: "Starters", name: "Veg Maggie", description: "Maggie Noodles mixed with peas and carrots.", price: 90, is_veg: true, is_chef_special: false, sort_order: 9,
    image_url: "/images/maggie.png",
  },
  {
    id: "s10", category: "Starters", name: "Eggs Maggie", description: "Maggie Noodles mixed with scrambled eggs.", price: 120, is_veg: false, is_chef_special: false, sort_order: 10,
    image_url: "/images/egg_maggie_v2.png",
  },
  {
    id: "s11", category: "Starters", name: "Mirchi pakoda(100gm)", description: "Crispy golden Mirchi Pakoda.", price: 70, is_veg: true, is_chef_special: false, sort_order: 11,
    image_url: "/images/mirchi_pakoda.png",
  },

  // ── Thalis ──────────────────────────────────────────────
  {
    id: "t1", category: "Thalis", name: "Chicken Biryani Thali", description: "Rice, Gravy, Salad, Sweet — a complete feast.", price: 390, is_veg: false, is_chef_special: true, sort_order: 20,
    image_url: "/images/biryani-hero-3.png",
  },
  {
    id: "t2", category: "Thalis", name: "Chicken Masala Thali", description: "Traditional chicken curry Thali with chapati.", price: 190, is_veg: false, is_chef_special: false, sort_order: 21,
    image_url: "/images/chicken_thali.png",
  },
  {
    id: "t3", category: "Thalis", name: "Eggs Masala thali", description: "Egg curry Thali with steamed rice and chapatis.", price: 170, is_veg: false, is_chef_special: false, sort_order: 22,
    image_url: "/images/egg_masala_thali.png",
  },
  {
    id: "t4", category: "Thalis", name: "Fish Thali", description: "Upscale Indian Fish Thali with fried fish and tangy fish curry.", price: 280, is_veg: false, is_chef_special: true, sort_order: 23,
    image_url: "/images/fish_thali.png",
  },
  {
    id: "t5", category: "Thalis", name: "Veg thali", description: "Daily veg, Dal, Rice, Chapati — pure comfort.", price: 150, is_veg: true, is_chef_special: false, sort_order: 24,
    image_url: null,
  },

  // ── Main Course ────────────────────────────────────────────
  {
    id: "m1", category: "Main Course", name: "Chicken Biryani (750gm)", description: "Our house specialty, layered with hand-picked spices.", price: 230, is_veg: false, is_chef_special: true, sort_order: 30,
    image_url: "/images/biryani-hero-2.png",
  },
  {
    id: "m2", category: "Main Course", name: "Chicken Biryani (450gm)", description: "Half portion of our house specialty layered with spices.", price: 140, is_veg: false, is_chef_special: false, sort_order: 31,
    image_url: "/images/biryani-hero-1.png",
  },
  {
    id: "m3", category: "Main Course", name: "Chicken Curry (500ml)", description: "Slow-cooked in a rich tomato-onion base.", price: 180, is_veg: false, is_chef_special: false, sort_order: 32,
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
  },
  {
    id: "m4", category: "Main Course", name: "Chicken kheema (300ml)", description: "Minced chicken sautéed with aromatic spices.", price: 200, is_veg: false, is_chef_special: false, sort_order: 33,
    image_url: "/images/chicken_kheema_user.png", 
  },
  {
    id: "m5", category: "Main Course", name: "Green Chicken Gravy(300ml)", description: "A fiery green paste of crushed green chilies and coriander.", price: 200, is_veg: false, is_chef_special: false, sort_order: 34,
    image_url: "/images/green_chicken_user.jpg",
  },
  {
    id: "m6", category: "Main Course", name: "Kharda Chicken (300ml)", description: "Spicy green chili chicken cooked in an iron pan.", price: 220, is_veg: false, is_chef_special: true, sort_order: 35,
    image_url: "/images/kharda_chicken.png",
  },
  {
    id: "m7", category: "Main Course", name: "Fish Curry (500ml)", description: "Flaky fish pieces simmered in a tangy coconut gravy.", price: 200, is_veg: false, is_chef_special: false, sort_order: 36,
    image_url: "/images/fish_curry.png",
  },
  {
    id: "m8", category: "Main Course", name: "Egg Burji (500ml)", description: "Spicy scrambled eggs with finely chopped onions.", price: 150, is_veg: false, is_chef_special: false, sort_order: 37,
    image_url: "/images/egg_burji.png",
  },
  {
    id: "m9", category: "Main Course", name: "Egg Curry (500ml)", description: "Rich red Egg Curry.", price: 170, is_veg: false, is_chef_special: false, sort_order: 38,
    image_url: "/images/egg_masala_thali.png",
  },

  // ── Add On ─────────────────────────────────────
  {
    id: "a1", category: "Add On", name: "Plain Rice Full", description: "Fluffy white Plain Basmati Rice.", price: 90, is_veg: true, is_chef_special: false, sort_order: 40,
    image_url: "/images/plain_rice.png",
  },
  {
    id: "a2", category: "Add On", name: "Plain Rice Half", description: "Fluffy white Plain Basmati Rice (Half portion).", price: 60, is_veg: true, is_chef_special: false, sort_order: 41,
    image_url: "/images/plain_rice.png",
  },
  {
    id: "a3", category: "Add On", name: "Chapati", description: "Soft, freshly rolled chapati.", price: 14, is_veg: true, is_chef_special: false, sort_order: 42,
    image_url: "https://plus.unsplash.com/premium_photo-1694141252010-8541a54a01c4?w=600&q=80",
  },
  {
    id: "a4", category: "Add On", name: "Bhajri bhakri", description: "Hot, fresh Indian Bhakri flatbread.", price: 35, is_veg: true, is_chef_special: false, sort_order: 43,
    image_url: "/images/bhakri.png",
  },
  {
    id: "a5", category: "Add On", name: "Jowri bhakri", description: "Hot, fresh Indian Jowri Bhakri flatbread.", price: 35, is_veg: true, is_chef_special: false, sort_order: 44,
    image_url: "/images/bhakri.png",
  },
  {
    id: "a6", category: "Add On", name: "Nachni bhakri", description: "Hot, fresh Indian Nachni Bhakri flatbread.", price: 35, is_veg: true, is_chef_special: false, sort_order: 45,
    image_url: "/images/bhakri.png",
  },
  {
    id: "a7", category: "Add On", name: "Rice bhakri", description: "Hot, fresh Indian Rice Bhakri flatbread.", price: 30, is_veg: true, is_chef_special: false, sort_order: 46,
    image_url: "/images/bhakri.png",
  },
];

export const MENU_CATEGORY_ORDER = [
  "Starters",
  "Thalis",
  "Main Course",
  "Add On",
];

export function groupByCategory(items: MenuItem[]): Record<string, MenuItem[]> {
  return items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}
