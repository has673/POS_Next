/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pink: "#FAC1D9",
        bg: "#292C2D",
        text: "#64748B",
        text1: "#475569",
        input: "#3D4142",
        placeholderColor: "#777979",
        dark: "#333333",
      },
      height: {
        card: "50vh",
        nav: "100vh",
        modal: "100vh",
        popup: "1200px",
        catCard: "12vh",
        twentyvh: "20vh",
        img: "38vh",
        add: "43vh",
        reservation: "12vh",
        fivevh: "5vh",
        threevh: "4vh",
        card: "60vh",
      },
      width: {
        card1: "30vw",
        modal: "30vw",
        profileCard: "17vw",
        nav: "10vw",
        card: "750px",
        popup: "640px",
        catCard: "10vw",
        img: "70vw",
        sixtyvw: "50vw",
        "60vw": "60vw",
      },
      margin: {
        "6vw": "45vw",
      },
    },
  },
  plugins: [],
};
