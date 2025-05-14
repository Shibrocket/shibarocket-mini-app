/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
  future: {
    disableColorOpacityUtilitiesByDefault: true,
    lightningcss: false, // Disable lightningcss
  },
}
