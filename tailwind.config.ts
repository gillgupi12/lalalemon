import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
],
  theme: {
    extend: {},
  },
  plugins: [],
}
