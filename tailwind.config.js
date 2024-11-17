/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'], // A modern sans-serif font
        serif: ['Merriweather', 'Georgia', 'serif'], // A clean serif font
        display: ['Poppins', 'sans-serif'], // Stylish font for headings
        body: ['Roboto', 'sans-serif'], // Neutral and widely used font for body
      },
    },
  },
  plugins: [],
}
