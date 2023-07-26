/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}', './dist/index.html'],
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '192': '48rem'
      }
    },
  },
  plugins: [],
};
