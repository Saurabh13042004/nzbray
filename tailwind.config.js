/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [ "dark" , "garden"],
  },
  content: [
    'node_modules/preline/dist/*.js',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
    require("daisyui")
  ],
}

