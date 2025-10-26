import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Here we define our film's color palette.
      colors: {
        background: "#222222ff", // The Void
        foreground: "#F5F5F5", // The Light
        accent: "#CEFF1A",     // The Funk (Electric Lime)
      },
      // Here we define our film's typography.
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["Clash Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;