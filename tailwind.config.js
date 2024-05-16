/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#404c6c",
        primaryText: "#ffb120",
        secondary: "#84c447",
      },
    },
  },
  plugins: [],
};
