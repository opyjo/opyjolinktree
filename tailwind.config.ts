import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        ink: "#0b0d0f",
        mist: "#f6f3ef",
        accent: "#f05a28",
        slate: "#5b6168",
        "accent-light": "#fff0eb",
      },
      boxShadow: {
        card: "0 2px 8px rgba(11,13,15,0.06), 0 1px 2px rgba(11,13,15,0.04)",
        "card-hover":
          "0 8px 24px rgba(11,13,15,0.10), 0 2px 6px rgba(11,13,15,0.06)",
        "card-edit":
          "0 0 0 2px #f05a28, 0 2px 8px rgba(11,13,15,0.06)",
        modal:
          "0 24px 48px rgba(11,13,15,0.16), 0 8px 16px rgba(11,13,15,0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-in-overlay": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "fade-in-overlay": "fade-in-overlay 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
