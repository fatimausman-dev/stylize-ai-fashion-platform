/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Poppins: ['Poppins', "sans-serif"],
    },
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
      colors: {
        light: 'white',
        pink: "#ee9ae5",
        lighter: "#d1cae3",  //lighterpurple
        purple: "#9a7af1",  //og-purple
        lightpurple: "#b4a9d1",  //lightpurple
        darker: "#564585",  //deeppurple
        deepblue: "#010851", 
        gray: "#707070",  
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
