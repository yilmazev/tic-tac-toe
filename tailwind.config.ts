import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",
      brand: {
        discord: "#5A6AEF"
      },
      primary: {
        50: "#fbf6fd",
        100: "#f6ecfb",
        200: "#edd8f6",
        300: "#e1b8ef",
        400: "#d08ee4",
        500: "#b962d3",
        600: "#9d42b7",
        700: "#833497",
        800: "#6d2c7c",
        900: "#5c2966",
        950: "#4f165a"
      },
      stone: {
        50: "#F6F6F6",
        100: "#E7E7E7",
        200: "#D1D1D1",
        300: "#B0B0B0",
        400: "#888888",
        500: "#6D6D6D",
        600: "#5D5D5D",
        700: "#4F4F4F",
        800: "#454545",
        900: "#3D3D3D",
        950: "#1E1E1E"
      },
      shamrock: {
        50: "#ECFEF5",
        100: "#CFFEE6",
        200: "#A3F9D3",
        300: "#6BF0BB",
        400: "#33DF9E",
        500: "#20C78A",
        600: "#17A271",
        700: "#10815D",
        800: "#0B674B",
        900: "#075440",
        950: "#023024"
      },
      cinnabar: {
        50: "#FFF1F1",
        100: "#FEDFE0",
        200: "#FEC6C7",
        300: "#FD9D9F",
        400: "#FD6569",
        500: "#FC363E",
        600: "#ED1E28",
        700: "#C7121B",
        800: "#A41218",
        900: "#88151A",
        950: "#4A0507"
      }
    },
    boxShadow: {
      bo: "0 5px 0 0 #4f165a",
      sh: "0 5px 0 0 #4f165a, 0 9px 0 0 #4f165a4D",
      none: "0 3px 0 0 #4f165a"
    }
  },
  plugins: []
}
export default config
