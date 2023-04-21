/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'actual-white': '#eff8ff',
        'navy-blue': '#161f64',
        'deep-blue': '#343e83',
        'velvet-blue': '#4283ad',
        'off-white': '#efe0e3',
        'light-purple': '#c592bb',
        'blue-purple': '#492a68'
      },
    },
  },
  plugins: [],
};
