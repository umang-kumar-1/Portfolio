import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCF8",
          100: "#FAF9F5",
          200: "#F5F4ED",
          300: "#EFEDE4",
          400: "#E8E3D8",
          500: "#DDD8CB",
        },
        warm: {
          50: "#FAF9F5",
          100: "#F5F4ED",
          200: "#EFEDE4",
          300: "#E8D9C5",
          400: "#D4C4AB",
          500: "#BBA98C",
          600: "#9E8B70",
          700: "#7A6B55",
          800: "#5E5D59",
          900: "#3A3936",
          950: "#262624",
        },
        terra: {
          300: "#E89B7A",
          400: "#DF8666",
          500: "#D97757",
          600: "#C6613F",
          700: "#B04D2C",
          800: "#8F3D1E",
        },
        sage: {
          400: "#9BAE78",
          500: "#788C5D",
          600: "#5F7045",
        },
        sky: {
          400: "#86B4D9",
          500: "#6A9BCC",
          600: "#4E82B8",
        },
        sand: "#E8D9C5",
        obsidian: "#141413",
        charcoal: {
          800: "#262624",
          900: "#1F1E1D",
          950: "#171615",
        },
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(1%, 2%)" },
          "30%": { transform: "translate(-3%, 1%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-1%, 3%)" },
          "60%": { transform: "translate(3%, -1%)" },
          "70%": { transform: "translate(-2%, 2%)" },
          "80%": { transform: "translate(1%, -3%)" },
          "90%": { transform: "translate(-3%, 1%)" },
        },
      },
      backgroundImage: {
        "grain-overlay": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "warm-sm": "0 2px 8px rgba(217, 119, 87, 0.08)",
        "warm-md": "0 4px 20px rgba(217, 119, 87, 0.12)",
        "warm-lg": "0 8px 40px rgba(217, 119, 87, 0.16)",
        "card-light": "0 1px 3px rgba(20,20,19,0.06), 0 4px 16px rgba(20,20,19,0.08)",
        "card-hover": "0 4px 12px rgba(20,20,19,0.08), 0 12px 40px rgba(20,20,19,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
