import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#f8fbff",
          100: "#e8f1ff",
          300: "#ffffff",
          500: "#e11919",
          600: "#c91515",
          900: "#7a0d0d",
        },
        wine: {
          500: "#0053a6",
          700: "#003f83",
          900: "#001f45",
        },
        coal: "#061a36",
      },
      boxShadow: {
        glow: "0 16px 60px rgba(0, 63, 131, 0.34)",
      },
    },
  },
  plugins: [],
};

export default config;
