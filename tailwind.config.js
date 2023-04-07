/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "system-ui", "sans-serif"],
      serif: ["Source Serif Pro", "serif"],
    },
    extend: {
      height: {
        4.5: "4.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
