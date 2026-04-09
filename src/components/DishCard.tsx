import Image from "next/image";
import { MenuItem } from "@/lib/supabase";

interface DishCardProps {
  item: MenuItem;
}

export default function DishCard({ item }: DishCardProps) {
  const imageUrl = item.image_url;

  return (
    <article
      className="card-surface group"
      aria-label={`${item.name}${item.price ? `, ₹${item.price}` : ""}`}
    >
      {/* Food image */}
      {imageUrl ? (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {item.is_chef_special && (
              <span className="bg-tertiary text-on-tertiary text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-xl">
                Chef&apos;s Special
              </span>
            )}
            {item.is_veg && (
              <span className="bg-green-100 text-green-800 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-xl">
                🌿 Veg
              </span>
            )}
          </div>
        </div>
      ) : (
        /* No-image card — uses tonal background */
        <div className="relative w-full h-16 bg-surface-container-low flex items-center justify-end px-4">
          <span className="text-4xl opacity-20">🍛</span>
          <div className="absolute top-3 left-3 flex gap-2">
            {item.is_chef_special && (
              <span className="bg-tertiary text-on-tertiary text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-xl">
                Chef&apos;s Special
              </span>
            )}
            {item.is_veg && (
              <span className="bg-green-100 text-green-800 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-xl">
                🌿 Veg
              </span>
            )}
          </div>
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-sans font-semibold text-on-surface text-[0.9375rem] leading-tight mb-1">
          {item.name}
        </h3>
        {item.description && (
          <p className="font-sans text-on-surface-variant text-[0.8125rem] leading-relaxed mb-3">
            {item.description}
          </p>
        )}

        {/* Footer — price + add button */}
        <div className="flex items-center justify-between mt-auto pt-1">
          {item.price != null ? (
            <span className="price-text text-lg">₹{item.price}</span>
          ) : (
            <span className="font-sans text-on-surface-variant text-xs italic">Price on request</span>
          )}

          <a
            href="tel:9769793452"
            className="btn-cta px-4 py-2 text-xs flex items-center gap-1"
            aria-label={`Order ${item.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            Order
          </a>
        </div>
      </div>
    </article>
  );
}
