/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        verticalGradient:
          "linear-gradient(to right, #ff6301, rgb(249 250 251), #ff6301 100%)",
      },
      colors: {
        primery: "rgb(15 23 42)", //"rgb(92 15 217)", //"rgb(249 115 22)", // Custom primary color
        darkGray: "#9333EA", // Custom secondary color
        secondary: "#ff6301", // Custom accent color
        background: "#F3F4F6", // Custom background color
      },
      boxShadow: {
        "hr-light": "0 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow
        "hr-dark": "0 4px 8px rgba(0, 0, 0, 0.3)", // Darker shadow
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        typing: "typing 0.75s steps(30, end) infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".select-none": {
          userSelect: "none",
          WebkitUserSelect: "none", // Safari
          MozUserSelect: "none", // Firefox
          msUserSelect: "none", // Internet Explorer/Edge
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
