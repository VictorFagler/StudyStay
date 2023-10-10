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
    extend: {},
    colors: {
      primary: "E78121",
      // secondary: ''
    },
  },
  plugins: [],
});
