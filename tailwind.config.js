/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- Agregamos esta línea
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}