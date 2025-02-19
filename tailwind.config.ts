import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        'a4-width': '794px',
      },
      height: {
        'a4-height': '1123px',
      },
      maxWidth: {
        'a4-width': '794px',
      },
      maxHeight: {
        'a4-height': '1123px',
      },
      boxShadow: {
        'a4': '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
