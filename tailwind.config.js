module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: ['10px', '10px'],
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
