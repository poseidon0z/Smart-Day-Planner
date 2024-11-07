/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "379px" }, // Custom breakpoint for small mobile screens
      },
    },
  },
  plugins: [],
};
