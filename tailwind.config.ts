import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1536px" },
    },
    extend: {
      colors: {
        background: "#050816",
        card: "#0B1220",
        "card-hover": "#0F1729",
        border: "rgba(148, 163, 184, 0.12)",
        primary: {
          DEFAULT: "#4F46E5",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        muted: "#94A3B8",
        "muted-foreground": "#64748B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        glow: "0 0 24px rgba(79, 70, 229, 0.35)",
        "glow-cyan": "0 0 24px rgba(6, 182, 212, 0.30)",
        "glow-accent": "0 0 24px rgba(139, 92, 246, 0.30)",
        card: "0 8px 30px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.10) 1px, transparent 0)",
        "glow-radial":
          "radial-gradient(ellipse at top right, rgba(79,70,229,0.25), transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
