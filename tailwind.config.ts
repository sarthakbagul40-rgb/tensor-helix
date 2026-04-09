import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Core ─────────────────────────────────────────────
        primary: "#755b00",
        "on-primary": "#ffffff",
        "primary-container": "#f4c430",
        "on-primary-container": "#695200",
        "primary-fixed": "#ffdf90",
        "primary-fixed-dim": "#f0c12c",
        "on-primary-fixed": "#241a00",
        "on-primary-fixed-variant": "#584400",

        secondary: "#904d00",
        "on-secondary": "#ffffff",
        "secondary-container": "#fd8b00",
        "on-secondary-container": "#603100",
        "secondary-fixed": "#ffdcc3",
        "secondary-fixed-dim": "#ffb77d",
        "on-secondary-fixed": "#2f1500",
        "on-secondary-fixed-variant": "#6e3900",

        tertiary: "#b52619",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#ffb9ae",
        "on-tertiary-container": "#a71b10",
        "tertiary-fixed": "#ffdad4",
        "tertiary-fixed-dim": "#ffb4a8",
        "on-tertiary-fixed": "#410000",
        "on-tertiary-fixed-variant": "#920703",

        // ── Surfaces ──────────────────────────────────────────────
        surface: "#fbf9f1",
        "surface-bright": "#fbf9f1",
        "surface-dim": "#dcdad2",
        "surface-variant": "#e4e3db",
        "surface-tint": "#755b00",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f4ec",
        "surface-container": "#f0eee6",
        "surface-container-high": "#eae8e0",
        "surface-container-highest": "#e4e3db",
        "on-surface": "#1b1c17",
        "on-surface-variant": "#4e4634",
        "inverse-surface": "#30312c",
        "inverse-on-surface": "#f3f1e9",
        "inverse-primary": "#f0c12c",

        outline: "#807661",
        "outline-variant": "#d1c5ad",
        background: "#fbf9f1",
        "on-background": "#1b1c17",

        // ── Error ─────────────────────────────────────────────────
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // ── Saffron Gold & Ember (aliases) ─────────────────────────
        saffron: "#f4c430",
        ember: "#fd8b00",
        spice: "#8B0000",
      },
      fontFamily: {
        display: ['"Noto Serif"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        lift: "0 12px 32px rgba(117, 91, 0, 0.08)",
        "lift-md": "0 8px 24px rgba(117, 91, 0, 0.10)",
        "lift-lg": "0 20px 48px rgba(117, 91, 0, 0.12)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(135deg, #904d00, #fd8b00)",
      },
    },
  },
  plugins: [],
};

export default config;
