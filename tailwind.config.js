/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "540px",
        "md-x": "912px",
        lg: "1110px",
      },
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
