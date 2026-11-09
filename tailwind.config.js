/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#141414",
              "background-light": "#f7f7f7",
              "background-dark": "#191919",
              "accent-purple": "#A855F7", // Neon Purple
              "accent-pink": "#EC4899",   // Neon Pink
              "accent-cyan": "#06B6D4",   // Neon Cyan
            },
            fontFamily: {
              "display": ["Plus Jakarta Sans", "sans-serif"],
              "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "2xl": "1rem",
              "3xl": "1.5rem",
              "full": "9999px"
            },
          },
        },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.dark .bg-background': {
          backgroundColor: '#0A0A0A',
        },
        '.dark .text-foreground': {
          backgroundColor: '#FFFFFF',
        },
        '.dark .bg-muted': {
          backgroundColor: '#1F1F1F',
        },
        '.dark .text-muted-foreground': {
          color: '#A0A0A0',
        },
      })
    }
  ],
}

