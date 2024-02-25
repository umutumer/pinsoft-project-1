import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        '265073': '#265073',
        '9eb8d9': "#9eb8d9",
      },
      primary:'#265073',
    },
  },
  plugins: [require("daisyui")],
};
export default config;
