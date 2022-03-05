const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: false,
  theme: {
    screens: {
      xs: "388px",
      ...defaultTheme.screens,
    },
    extend: {
      height: {
        fit: "fit-content",
      },
      minWidth: {
        "18rem": "18rem",
      },
      maxWidth: {
        "30rem": "30rem",
      },
    },
  },
  plugins: [],
};
