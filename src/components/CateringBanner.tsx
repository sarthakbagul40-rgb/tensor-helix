import Image from "next/image";

const PHONE = "9769793452";

export default function CateringBanner() {
  return (
    <section
      id="catering"
      className="relative py-20 px-5 overflow-hidden"
      style={{ backgroundColor: "#1b1c17" }}
    >
      {/* Warm-toned background image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=70&fm=webp"
          alt="Catering spread"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Saffron gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#241a00]/80 via-[#904d00]/40 to-[#fd8b00]/20" />

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-1.5 mb-6">
          <span className="text-primary-fixed-dim text-xs font-semibold uppercase tracking-widest">
            Catering Services
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl font-bold text-white leading-tight mb-4">
          Host Your Next Event
          <span className="block text-primary-fixed-dim">with Us!</span>
        </h2>

        {/* Body */}
        <p className="font-sans text-[#f3f1e9]/75 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          Catering services available for parties &amp; weddings. From intimate
          gatherings to grand celebrations — we bring the feast to you.
        </p>

        {/* Highlights */}
        <div className="flex justify-center gap-6 mb-10 flex-wrap">
          {["Weddings", "Birthdays", "Corporate Events", "Pooja Meals"].map(
            (tag) => (
              <span
                key={tag}
                className="font-sans text-xs text-[#f3f1e9]/80 flex items-center gap-1"
              >
                <span className="text-primary-container">✦</span> {tag}
              </span>
            )
          )}
        </div>

        {/* CTA */}
        <a
          href={`tel:${PHONE}`}
          id="catering-cta"
          className="btn-cta px-7 py-4 text-base inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          Inquire About Catering
        </a>
      </div>
    </section>
  );
}
