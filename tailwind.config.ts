import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        minecraft: ["'Press Start 2P'", "monospace"],
        w14: ["'Outfit'", "sans-serif"],
      },
      colors: {
        w14: {
          cyan: "#00ffcc",
          dark: "#050505",
        },
        mc: {
          grass: "#5D9E3F",
          dirt: "#845E2A",
          stone: "#888888",
          sky: "#70B8FF",
          nightsky: "#0D1B2A",
          wood: "#C79E60",
          leaf: "#4B7A31",
          green: "#4ADE80",
          blue: "#60A5FA",
          yellow: "#FBBF24",
          orange: "#FB923C",
          purple: "#A78BFA",
          pink: "#F472B6",
        },
      },
      backgroundImage: {
        "mc-dirt": "url('/textures/dirt.png')",
        "mc-grass": "url('/textures/grass_block_top.png')",
      },
    },
  },
  plugins: [],
};
export default config;
