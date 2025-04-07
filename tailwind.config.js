/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: '#262528',
        'night-onyx': '#1A191C',
        'orange-peel': '#EF8741',
        mist: '#C1E0D7',
        'pure-white': '#FFFFFF',
        'light-gray': '#E7EEEC',
      },
      borderWidth: {
        '4': '4px',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}