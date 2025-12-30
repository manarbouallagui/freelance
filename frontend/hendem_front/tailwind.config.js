/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Abaya Wera theme
        primary: '#0B0B0D', // almost black (fabric)
        gold: '#C59D5F', // warm gold accent
        ivory: '#F7F3EF', // light fabric/linen
        taupe: '#6B6462', // muted tone
        plum: '#6A4B7C', // deep plum accent
        accent: '#C59D5F',
        dark: '#0B0B0D',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
