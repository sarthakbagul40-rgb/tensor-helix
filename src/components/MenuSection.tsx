"use client";

import { useState, useMemo } from "react";
import DishCard from "./DishCard";
import { MenuItem } from "@/lib/supabase";
import { MENU_CATEGORY_ORDER, groupByCategory } from "@/lib/menu-data";

interface MenuSectionProps {
  items: MenuItem[];
}

const DIETARY_CHIPS = [
  { label: "All", value: "all" },
  { label: "🌿 Veg", value: "veg" },
  { label: "🍗 Non-Veg", value: "nonveg" },
  { label: "⭐ Chef's Special", value: "special" },
];

export default function MenuSection({ items }: MenuSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    switch (activeFilter) {
      case "veg":
        return items.filter((i) => i.is_veg);
      case "nonveg":
        return items.filter((i) => !i.is_veg);
      case "special":
        return items.filter((i) => i.is_chef_special);
      default:
        return items;
    }
  }, [items, activeFilter]);

  const grouped = useMemo(() => groupByCategory(filteredItems), [filteredItems]);

  // Sort categories by canonical order
  const orderedCategories = MENU_CATEGORY_ORDER.filter(
    (cat) => grouped[cat]?.length > 0
  );
  // Append any extra categories not in canonical order
  Object.keys(grouped).forEach((cat) => {
    if (!orderedCategories.includes(cat)) orderedCategories.push(cat);
  });

  return (
    <section id="menu" className="bg-surface py-16 px-5">
      <div className="max-w-md mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
            Our Menu
          </p>
          <h2 className="category-heading text-3xl font-bold mb-3">
            Our Culinary Story
          </h2>
          <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
            Each dish is crafted with heritage spices and slow-cooked to
            perfection.
          </p>
        </div>

        {/* Dietary filter chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide"
          role="group"
          aria-label="Filter menu items"
        >
          {DIETARY_CHIPS.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setActiveFilter(chip.value)}
              className={`chip whitespace-nowrap flex-shrink-0 ${
                activeFilter === chip.value ? "active" : ""
              }`}
              aria-pressed={activeFilter === chip.value}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Menu categories */}
        {orderedCategories.length === 0 ? (
          <p className="text-center text-on-surface-variant py-12 font-sans">
            No items match that filter.
          </p>
        ) : (
          <div className="space-y-14">
            {orderedCategories.map((category) => (
              <div key={category}>
                {/* Category header — 40px+ whitespace above */}
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="category-heading text-2xl font-bold">
                    {category}
                  </h2>
                  <div className="flex-1 h-px bg-surface-container-highest" />
                  <span className="font-sans text-xs text-on-surface-variant">
                    {grouped[category].length} item
                    {grouped[category].length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Dish grid */}
                <div className="flex flex-col gap-4">
                  {grouped[category].map((item, idx) => (
                    <div
                      key={item.id}
                      className="fade-in-up"
                      style={{ animationDelay: `${idx * 0.07}s`, opacity: 0 }}
                    >
                      <DishCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
