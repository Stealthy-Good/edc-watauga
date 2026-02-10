import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Deep forest green (mountains, authority, nature)
        primary: {
          DEFAULT: "#1B4D3E",
          light: "rgba(27, 77, 62, 0.08)",
          medium: "rgba(27, 77, 62, 0.15)",
          dark: "#143D30",
        },
        // Accent — Burnt orange/gold (fall foliage, App State, warmth)
        accent: {
          DEFAULT: "#C75B12",
          light: "rgba(199, 91, 18, 0.08)",
          medium: "rgba(199, 91, 18, 0.15)",
          dark: "#A04A0F",
        },
        // Sky — Sky blue (mountain air, innovation)
        sky: {
          DEFAULT: "#5B9BD5",
          light: "rgba(91, 155, 213, 0.08)",
          medium: "rgba(91, 155, 213, 0.15)",
          dark: "#4A88BF",
        },
        // Earth — Warm brown (Appalachian heritage)
        earth: {
          DEFAULT: "#8B6F47",
          light: "rgba(139, 111, 71, 0.08)",
          medium: "rgba(139, 111, 71, 0.15)",
          dark: "#6F5838",
        },
        // Surface colors
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8f7f5",
          warm: "#faf8f5",
        },
        // Semantic status colors
        success: {
          DEFAULT: "#16a34a",
          light: "rgba(34, 197, 94, 0.1)",
        },
        warning: {
          DEFAULT: "#d97706",
          light: "rgba(251, 191, 36, 0.1)",
        },
        error: {
          DEFAULT: "#dc2626",
          light: "rgba(239, 68, 68, 0.1)",
        },
      },
      textColor: {
        primary: "#1a1a1a",
        secondary: "#555555",
        muted: "#7a7a7a",
      },
      borderColor: {
        light: "rgba(0, 0, 0, 0.08)",
        DEFAULT: "rgba(0, 0, 0, 0.12)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.08)",
        elevated: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        card: "12px",
        dashboard: "16px",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-outfit)",
          "Outfit",
          "system-ui",
          "sans-serif",
        ],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "count-up": "count-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
