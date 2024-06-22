/** @type {import('tailwindcss').Config} */


// export default {
//   content: [ 
//     "./src/**/*.{js,jsx,ts,tsx}",
// ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        
      },


    },
     // that is animation class
     animation: {
      fade: 'fadeOut 1s ease-in-out',
    },

    // that is actual animation
    keyframes: theme => ({
      fadeOut: {
        '0%': { transform: 'translateY(-5rem)', opacity : '0'},
        '100%': { opacity: '1' },
      },
    }),

    

  },
  plugins: [],
});