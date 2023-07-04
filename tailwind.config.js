/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        xsl: "380px",
        sm: "540px",
        xsm: "438px",
        "md-x": "912px",
        lg: "1110px",
      },
      colors: {
        background: "#0F0F0F",
        primary: "#AD231B",
        White: "#F0F0F0",
        Gray: "#414141",
        "transparent-black": "rgba(15, 15, 15, 0.53)  ",
        "Dark-700": "#1E1E1E",
        "Gray-500": "#575757",
        "Gray-400": "#2F2E2E",
        "primary-500": "#840700",
        "Gray-200": "#969696",
      },
      maxWidth: {
        "8xl": "86rem",
      },
    },
  },
  plugins: [],
};
