/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        'brand-primary': '#418D23',
        'brand-secondary': '#ABEFC6',
        'secondary-bg': '#F9FAFB',
        'secondary-border': '#EAECF0',
      },
    },
  },
  plugins: [],
}