const PHONE = "9769793452";

export default function StorySection() {
  const features = [
    {
      icon: "🔥",
      title: "Freshly Cooked Daily",
      desc: "Every dish prepared from scratch each morning with fresh ingredients.",
    },
    {
      icon: "🌿",
      title: "Authentic Flavors",
      desc: "Heritage spice blends passed down through generations.",
    },
    {
      icon: "🎉",
      title: "Catering Services",
      desc: "Intimate gatherings to grand wedding celebrations handled with care.",
    },
    {
      icon: "✨",
      title: "Hygienic Kitchen",
      desc: "Spotless, FSSAI-compliant kitchen with daily quality checks.",
    },
  ];

  return (
    <section
      id="story"
      className="relative bg-section py-16 px-5 overflow-hidden spice-texture"
    >
      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
            Who We Are
          </p>
          <h2 className="font-display text-3xl font-bold text-on-surface mb-3">
            Rooted in Tradition,
            <br />
            <span className="text-primary">Cooked with Love</span>
          </h2>
          <p className="font-sans text-on-surface-variant text-sm leading-relaxed">
            Delicious Biryani is more than a restaurant — it&apos;s a family
            heirloom. Every grain of rice carries the aroma of slow-cooked
            spices and the warmth of home.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="card-surface p-4 fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <span className="text-2xl mb-2 block">{feat.icon}</span>
              <h3 className="font-sans font-semibold text-on-surface text-sm mb-1">
                {feat.title}
              </h3>
              <p className="font-sans text-on-surface-variant text-xs leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pull-quote */}
        <blockquote className="mt-10 border-l-4 border-primary-container pl-4">
          <p className="font-display text-lg italic text-on-surface leading-snug">
            &ldquo;We are not just building a menu; we are curating a digital
            table.&rdquo;
          </p>
          <cite className="font-sans text-xs text-on-surface-variant mt-2 block not-italic">
            — The Delicious Biryani Kitchen
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
