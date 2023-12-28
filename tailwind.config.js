/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#151619",
          200: "#1D1F22",
          300: "#2B2D31",
          400: "#35393F",
        },
        light: {
          100: "#5A6069",
          200: "#7C8187",
          300: "#C1C4CB",
          400: "#E4E4E4",
          500: "#F5F5F5",
        },
        orangeHot: "#E46643",
        orangeDim: "#F39765",
      },
      fontFamily: {
        design: ["Roboto", "sans-serif"],
        designMono: ["Roboto Mono", "sans-serif"],
        designSlab: ["Roboto Slab", "sans-serif"],
      },
    },
  },
  plugins: [],
};
