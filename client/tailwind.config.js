/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./components/**/*.{html,js, jsx}",
    "./pages/**/*.{html,js}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontfamily: {
        sans: ["Montserrat", "-apple-system", "BlinkMacSystemFont"],
        serif: ["Georgia", "Cambria"],
        mono: ["SFMono-Regular", "Menlo"],
        body: ['"Kumbh Sans"', "sans-serif"],
      },
      colors: {
        primary: "#E78121",
        secondary: "#FFFFF",
        lightgray: "#E555555",
        darkgray: "#272727",
      },
    },
  },
  plugins: [],
});
