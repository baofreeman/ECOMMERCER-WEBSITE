/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "0", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    height: {
      62: "var(--header-height)",
      full: "100%",
      screen: "100vh",
      dvh: "100dvh",
    },
    fontSize: {
      xs: "0.8rem",
      sm: "1.1rem",
      md: "1.2rem",
      base: "1.6rem",
      lg: "1.8rem",
      xl: "2rem",
      "2xl": "2.4rem",
      "3xl": "2.8rem",
      "4xl": "3.2rem",
      "5xl": "3.8rem",
    },
    fontWeight: {
      thin: "300",
      light: "300",
      normal: "400",
      medium: "500",
      bold: "600",
    },
    fontFamily: {
      mono: "IBM Plex Mono",
    },
    colors: {
      DEFAULT: "var(--color-black)",
      light: "var(--color-light)",
      silver: "var(--color-silver)",
      black: "var(--color-black)",
      gray: "var(--color-gray)",
      active: "var(--color-active)",
      transparent: "transparent",
      current: "currentColor",
      white: "var(--color-white)",
      red: "#f95200",
      green: "#ade25d",
      orange: "#ff8700",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    borderColor: {
      DEFAULT: "var(--color-gray)",
      white: "var(--color-white)",
      orange: "#ff8700",
    },
    borderStyle: {
      DEFAULT: "solid",
    },
    extend: {
      aspectRatio: {
        "9/16": "9/16",
      },

      animation: {
        marque: "marque 20s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      outline: ["data"], // Bật hỗ trợ cho các thuộc tính data-*
    },
  },
  darkMode: "selector",
  plugins: [],
};
