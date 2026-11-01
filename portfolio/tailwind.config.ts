import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { navy: "#0F172A", card: "#1E293B", accent: "#3B82F6" },
    fontFamily: {
      display: ["var(--font-display)", "system-ui", "sans-serif"],
      sans: ["var(--font-body)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
    },
  } },
  plugins: [],
};
export default config;
