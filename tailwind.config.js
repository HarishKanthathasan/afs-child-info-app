// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00467f', // Alliance Finance blue
        secondary: '#f8a51d', // Alliance Finance yellow
        neutral: '#f3f3f3', // Light gray background
      },
    },
  },
  plugins: [],
};
