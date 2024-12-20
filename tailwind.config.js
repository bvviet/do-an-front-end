/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        sm: "24px",
        lg: "4rem",
        xl: "5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1270px",
      },
    },
    extend: {
      fontFamily: {
        slab: ['"Roboto Slab"', "serif"],
        manrope: ['"Manrope", sans-serif'],
        itim: ['Itim', 'cursive'],
        nerko: ['Nerko One', 'cursive'],
      },
      colors: {
        main: "#005d63",
        "custom-white": "#ffffff",
        "custom-dark": "#1e293b", // màu tối
        "custom-indigo": "#4f46e5", // màu indigo
        "custom-gray": "#000", // màu xám sáng
        "custom-dark-gray": "#374151", // màu xám tối
      },
      boxShadow: {
        "custom-shadow":
          "0 0 5px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        spin: "spin 1s linear infinite", // Define the custom spin animation
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
