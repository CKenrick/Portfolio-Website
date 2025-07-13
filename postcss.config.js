export default {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.js",
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
    },
    autoprefixer: {},
  },
} 