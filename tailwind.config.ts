import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deepest": "#030712",
        "bg-main": "#060E1F",
        "bg-panel": "#0B1730",
        "bg-panel-2": "#0E1D3D",
        royal: "#1E40AF",
        electric: "#2F6FED",
        cyan: "#22D3EE",
        fog: "#93A5C4",
        "fog-dim": "#5C6E8C",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
