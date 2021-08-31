module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        zeldabg: "url('/zeldabg.webp')",
      }),
      colors: {
        def: "#e2ded3",
        black: "black",
      },
      width: {
        130: "130px",
      },
      maxWidth: {
        "2xlp": "44rem",
        "3xlp": "52rem",
      },
      height: {
        130: "130px",
      },
      scale: {
        neg: "-1",
      },
      screens: {
        lgp: "1100px",
        xlp: "1400px",
        "2xl": "1536px",
        "3xl": "1700px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled", "hover"],
      borderOpacity: ["hover", "focus"],
      margin: ["first", "last"],
      padding: ["first", "last"],
    },
  },
  plugins: [],
};
