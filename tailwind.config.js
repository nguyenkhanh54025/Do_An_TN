/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: '#fff',
      black: '#000',
      black08: '#000000a8',
      primary: '#CC1409',
      secondary: '#3E3E3E',
      yellow: '#FFC500',
      blue: '#1E3FEC',
      oran: '#FF7A00',
      gray: '#929292',
      grayF5: '#F5F5F5',
      darkBlue: '#121E2E',
    },
    backgroundImage: {
      linear: 'linear-gradient(to right, #CAB46A, #FFC500)'
    },
    container: {
      center: true,
      screens: {
        md: '1200px',
        lg: '1200px',
        xl: '1200px',
        '2xl': '1200px',
      }
    },
    boxShadow: {
      nomal: '0px 0px 8px 0px #0000004d',
    }
  },
  plugins: [],
}

