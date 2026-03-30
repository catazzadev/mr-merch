/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["BebasNeue_400Regular"],
        montserrat: ["Montserrat_400Regular"],
        "montserrat-medium": ["Montserrat_500Medium"],
        "montserrat-semibold": ["Montserrat_600SemiBold"],
        "montserrat-bold": ["Montserrat_700Bold"],
      },
      colors: {
        surface: {
          DEFAULT: "#0e0e0e",
          card: "#1a1a1a",
          input: "#1f1f1f",
          high: "#201f1f",
        },
        accent: {
          DEFAULT: "#FF007F",
          light: "#FF3399",
        },
      },
    },
  },
  plugins: [],
};
