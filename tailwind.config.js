/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '4.5': '4.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

