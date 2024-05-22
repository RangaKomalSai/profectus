/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        calistoga: ['Calistoga', 'sans-serif'],
        crimson: ["Crimson Text", 'serif']
      },
    },
  },
  plugins: [],
}