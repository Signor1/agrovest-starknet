import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        lightgreen: "#D2FE75",
        darkgreen: "#02390F",
        "background-primary-light": "#FFFFFF",
        "background-primary-dark": "#1F1F1F",
        "accent-primary": "#FF7300",
        "accent-secondary": "#141925",
        "accent-tertiary": "#F7F7F7",
        "button-primary": "#141925",
        "button-secondary": "#FFEBDA",
        "button-tertiary": "#F5F5F5",
        "orange-accent-primary": "#332920",
        "text-white-secondary": "#EAEAEA",
        "text-primary": "#7A7A7A",
        "text-secondary": "#344054",
        "text-tertiary": "#BC988C",
        "text-links": "#FF6734",
        shadow: "#EC796B33",
        backdrop: "#ffffff4d" /* 30% */,
        "green-primary": "#CDFFD2",
        "green-secondary": "#10A41F",
        "red-primary": "#FFCDCD",
        "red-secondary": "#FE4E4E",
        "yellow-primary": "#FD9332",
        "yellow-secondary": "#FFEECD",
        "grey-light-primary": "#F9FAFB",
      },
      backgroundImage: {
        "footer-image": "url('/assets/footer-bg.svg')",
        "burner-wallet-bg": "url('/assets/burnerWalletBg.svg')",
        "burner-wallet-bg-dark": "url('/assets/burnerWalletBgDark.svg')",
        "primary-gradient":
          "linear-gradient(180deg, #FF8D4E -9.12%, #FF6734 39.7%)",
      },
      boxShadow: { "popover-shadow": "0px 0px 50px 2px #EC796B33" },
    },
  },
  plugins: [heroui(), tailwindAnimate],
} satisfies Config;

export default config;
