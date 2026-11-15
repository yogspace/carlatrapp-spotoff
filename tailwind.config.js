/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        admiral_cat: ['admiral_cat', 'sans'],
        ws_regular: ['ws_regular', 'sans'],
        ws_bold: ['ws_bold', 'sans'],
      },
    },
  },
  plugins: [],
};
