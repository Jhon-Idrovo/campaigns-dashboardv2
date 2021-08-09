const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      base: colors.gray[900],
      "txt-base": colors.gray[200],
      primary: "#8F90EE",
      "txt-primary": colors.gray[900],
      secondary: "#474747",
      "txt-secondary": colors.white,
      ligth: colors.blueGray[300],
      "txt-ligth": colors.black,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
