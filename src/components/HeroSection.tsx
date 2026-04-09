"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const PHONE = "9769793452";

// Three premium AI-generated biryani hero images — local, copyright-free
const HERO_IMAGES = [
  {
    src: "/images/biryani-hero-1.png",
    alt: "Authentic Chicken Biryani in a traditional copper handi pot, garnished with fried onions and fresh coriander",
  },
  {
    src: "/images/biryani-hero-2.png",
    alt: "Premium Chicken Biryani flat-lay with saffron rice, herbs, and raita — overhead food photography",
  },
  {
    src: "/images/biryani-hero-3.png",
    alt: "Steaming hot Chicken Biryani close-up with dramatic backlighting — silver serving spoon",
  },
];

const SLIDE_INTERVAL_MS = 5000;

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-cycle slides
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 500); // half of transition duration
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#1b1c17]"
    >
      {/* ── Slideshow images ──────────────────────────────── */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: idx === activeIdx ? (isTransitioning ? 0 : 1) : 0,
            zIndex: idx === activeIdx ? 1 : 0,
          }}
          aria-hidden={idx !== activeIdx}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={idx === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Gradient overlays ─────────────────────────────── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(27,28,23,0.92) 0%, rgba(27,28,23,0.30) 55%, transparent 100%)",
        }}
      />
      {/* Subtle warm tint on top edge */}
      <div
        className="absolute inset-0 z-10 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(251,249,241,0.08) 0%, transparent 100%)",
        }}
      />

      {/* ── Spice pattern overlay ──────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='14' fill='none' stroke='%23f4c430' stroke-width='1.5'/%3E%3Ccircle cx='40' cy='40' r='5' fill='%23f4c430'/%3E%3Cpath d='M40 18 L42 34 L40 30 L38 34 Z' fill='%23f4c430'/%3E%3Cpath d='M40 62 L42 46 L40 50 L38 46 Z' fill='%23f4c430'/%3E%3Cpath d='M18 40 L34 42 L30 40 L34 38 Z' fill='%23f4c430'/%3E%3Cpath d='M62 40 L46 42 L50 40 L46 38 Z' fill='%23f4c430'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
          opacity: 0.03,
        }}
      />

      {/* ── Hero content ──────────────────────────────────── */}
      <div className="relative z-20 px-6 pb-14 pt-32 max-w-md mx-auto w-full">
        {/* Eyebrow chip */}
        <div className="inline-flex items-center gap-2 mb-4 fade-in-up">
          <span className="chip text-xs">🌟 Freshly Cooked Daily</span>
        </div>

        {/* Display headline — Noto Serif */}
        <h1 className="font-display text-[2.75rem] leading-[1.1] font-bold text-white mb-3 fade-in-up fade-in-up-delay-1">
          Delicious
          <span
            className="block"
            style={{ color: "#f0c12c" }} /* inverse-primary / primary-fixed-dim */
          >
            Biryani
          </span>
        </h1>

        <p className="font-sans text-base mb-8 max-w-[290px] fade-in-up fade-in-up-delay-2"
          style={{ color: "rgba(243,241,233,0.80)" }}>
          Freshly Cooked Food — Savoring Stories with Every Bite.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 fade-in-up fade-in-up-delay-3">
          <a
            href={`tel:${PHONE}`}
            id="hero-call-cta"
            className="btn-cta px-6 py-4 text-base flex items-center justify-center gap-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            Order Now — Call {PHONE}
          </a>

          <a
            href="#menu"
            className="btn-ghost px-6 py-3.5 text-sm flex items-center justify-center gap-2"
            style={{ color: "rgba(243,241,233,0.85)" }}
          >
            View Full Menu ↓
          </a>
        </div>
      </div>

      {/* ── Slide indicator dots ──────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: idx === activeIdx ? "1.5rem" : "0.4rem",
              height: "0.4rem",
              background:
                idx === activeIdx
                  ? "#f0c12c"
                  : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
