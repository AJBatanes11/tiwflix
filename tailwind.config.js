/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#191919",
        tertiary: "#E50914",
        quaternary: "#2f2f2f",
        quinary: "#191919",
        neutral: "#71717a",
        gradient: "linear-gradient(180deg, rgba(34, 139, 230, 0.2) 0%, rgba(36, 36, 36, 1) 100%)"
      }
    },
  },
  plugins: [],
}

