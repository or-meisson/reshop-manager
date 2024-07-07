/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const rtl = require('tailwindcss-rtl');

module.exports = {
    content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
      },
      colors: {
        'mint-green': '#B6D3BF'
      }
    },
  },
  plugins: [
    rtl,
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
    darkTheme:"light"
 }
}

