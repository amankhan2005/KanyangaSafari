import type { Config } from "tailwindcss";

/**
 * Kanyanga Safari — strict black & white system.
 * The palette is replaced, not extended: only #000000 and #FFFFFF exist.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: { transparent: "transparent", current: "currentColor", black: "#000000", white: "#FFFFFF" },
    ringColor: { DEFAULT: "#000000", black: "#000000", white: "#FFFFFF" },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", '"DM Serif Display"', "Georgia", '"Times New Roman"', "serif"],
        sans: ["var(--font-sans)", "Manrope", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      maxWidth: { site: "1440px" },
      transitionTimingFunction: { luxe: "cubic-bezier(.2,.7,.1,1)" },
    },
  },
  plugins: [],
} satisfies Config;
