import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'sans-fancy': ['HM Sans Regular']
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'white-smoke': '#faf8f7',
        'dark-slate-grey': '#273720',
        'white-smoke-2': '#f2f2f2',
        'light-green': '#d2ebd5',
        'medium-sea-green': '#42ae60',
        'yellow-custom': '#e6ff4c',
        'grey': '#81857f',
        'green': '#faf8f7',
        'vivid-purple': '#9b51e0'
      }
    },
  },
  plugins: [],
};
export default config;
