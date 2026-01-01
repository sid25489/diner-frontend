/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        diner: {
          cream: "#FFEBD8",
          coffee: "#6F4E37",
          terracotta: "#E2725B",
          gold: "#C19554",
          "mural-blue": "#3A5BA0",
          "mural-pink": "#EA638C",
        },
      },
      boxShadow: {
        diner: "0 4px 24px 0 rgba(111, 78, 55, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

