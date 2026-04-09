export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface py-10 px-5">
      <div className="max-w-md mx-auto">
        {/* Brand */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍛</span>
            <span className="font-display font-bold text-lg">
              Delicious Biryani
            </span>
          </div>
          <p className="font-sans text-xs text-inverse-on-surface/60 leading-relaxed">
            Freshly Cooked Food — Savoring Stories with Every Bite.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {[
            { label: "Menu", href: "#menu" },
            { label: "Our Story", href: "#story" },
            { label: "Catering", href: "#catering" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-sans text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="font-sans text-xs text-inverse-on-surface/50">
            © {year} Delicious Biryani. All rights reserved.
          </p>
          <a
            href="tel:9769793452"
            className="font-sans text-xs text-primary-fixed-dim hover:underline"
          >
            📞 9769793452
          </a>
        </div>
      </div>
    </footer>
  );
}
