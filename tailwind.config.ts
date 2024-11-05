import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'btnshadow':'0px 1px 2px rgba(7, 9, 8, 0.03), 0px 1px 3px rgba(7, 9, 8, 0.05), inset 0px 1px 4px -1px rgba(255, 255, 255, 0.3)',
        'btnshadow2':'0 0 0 1px #0000000d,0 0 30px 1px #00000026'

      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
