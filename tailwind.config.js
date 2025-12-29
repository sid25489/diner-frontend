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
          cream: '#FFEBD8', // background
          coffee: '#6F4E37', // rich brown
          terracotta: '#E2725B', // warm accent
          gold: '#C19554', // elegant accent
          muralBlue: '#3A5BA0', // for mural vibes
          muralPink: '#EA638C', // mural accent
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        diner: '0 4px 24px 0 rgba(111, 78, 55, 0.08)',
      },
    },
  },
  plugins: [],
};
