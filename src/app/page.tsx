import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import MenuSection from "@/components/MenuSection";
import CateringBanner from "@/components/CateringBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getMenuItems } from "@/lib/supabase";
import { STATIC_MENU } from "@/lib/menu-data";

export default async function HomePage() {
  // Attempt to fetch live menu data from Supabase.
  // Falls back to static data if Supabase is unavailable or the table is empty.
  let menuItems = await getMenuItems().catch(() => []);
  if (menuItems.length === 0) {
    menuItems = STATIC_MENU;
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Sticky glassmorphism navigation */}
      <NavBar />

      {/* Full-bleed hero — food photo with editorial headline */}
      <HeroSection />

      {/* Brand story + features grid */}
      <StorySection />

      {/* Menu — live from Supabase, with dietary filter chips */}
      <MenuSection items={menuItems} />

      {/* Catering CTA — cinematic dark section */}
      <CateringBanner />

      {/* Phone + contact form */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
