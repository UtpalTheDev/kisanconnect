module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    minHeight: {
      '0': '0',
      '1':'1rem',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      'screen':'100vh',
     },
     flexGrow: {
      '0': 0,

     DEFAULT: 1,

     DEFAULT: 2,

     '1': 1,
     '2': 2,
     '3': 3
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};