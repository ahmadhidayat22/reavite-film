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
    extend: {},
  },
  plugins: [],
});