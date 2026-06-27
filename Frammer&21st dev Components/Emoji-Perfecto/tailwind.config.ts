import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Google Sans"',
          '"Google Sans Text"',
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tight: "-0.02em",
      },
    },
  },
  plugins: [],
}

export default config
