/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        active: '#3967C3',
        sky: 'rgb(12 74 110)',
        background: {
          light: '#020d2480',
          DEFAULT: '#020D24',
          dark: '#0e7490',
          VERY_LIGHT: 'rgba(0,0,0,0.1)',
        },
      },
    },
  },
  plugins: [],
}
