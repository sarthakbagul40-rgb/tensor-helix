"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PHONE = "9769793452";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lift" : "bg-transparent"
      }`}
    >
      <nav className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-display font-bold text-xl"
        >
          <span className="text-2xl">🍛</span>
          <span>Delicious Biryani</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-on-surface-variant">
          <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
          <a href="#catering" className="hover:text-primary transition-colors">Catering</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        {/* CTA */}
        <a
          href={`tel:${PHONE}`}
          className="btn-cta px-4 py-2 text-sm hidden md:inline-flex items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          Call to Order
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <>
                <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
              </>
            ) : (
              <>
                <path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/>
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-outline-variant/20 px-5 py-4 flex flex-col gap-4">
          <a href="#menu" className="text-on-surface font-medium" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#catering" className="text-on-surface font-medium" onClick={() => setMenuOpen(false)}>Catering</a>
          <a href="#contact" className="text-on-surface font-medium" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href={`tel:${PHONE}`} className="btn-cta px-4 py-2.5 text-sm text-center">
            📞 Call {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}
