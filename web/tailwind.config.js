/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "Arial", "sans-serif"],
      },
      letterSpacing: {
        custom: "-0.025em",
      },
      colors: {
        placeholder: "#666670",
        gray: {
          label: "#3E3E3E",
          border: "#EAEAEC",
        },
        red: {
          DEFAULT: "#FF3939",
        },
        blue: {
          DEFAULT: "#1C61FF",
        },
        green: {
          DEFAULT: "#00C67F",
        },
        yellow: {
          DEFAULT: "#FBFF2C",
        },
      },
    },
  },
  plugins: [],
};
