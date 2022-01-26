module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      indigo: {
        100: '#2B3C56',
        200: '#2B3C56',
        300: '#2B3C56',
        400: '#2B3C56',
        500: '#2B3C56',
        600: '#2B3C56',
        700: '#2B3C56',
        800: '#2B3C56',
        900: '#2B3C56',
      }
    },
    extend: {
      fontSize: {
        xxs: ['10px', '10px'],
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
