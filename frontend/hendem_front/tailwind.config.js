/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral nude / soft natural palette (no strong pink gradients)
        primary: '#FFF9F6', // warm cream background
        accent: '#C9A87C', // soft camel / nude accent for buttons
        ivory: '#FFF9F6', // same as primary
        taupe: '#D6C6BD', // soft taupe
        beige: '#E9E1DA', // light beige
        text: '#3C2E2A', // warm brown text color
        dark: '#3C2E2A',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
