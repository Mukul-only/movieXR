/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        primary: "#AD231B",
        White: "#F0F0F0",
        Gray: "#414141",
      },
      maxWidth: {
        "8xl": "86rem",
      },
    },
  },
  plugins: [],
};
