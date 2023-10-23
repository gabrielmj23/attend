/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'amarillo': {
          DEFAULT: '#fbbf24',
          'activo': '#d97706',
        },
        'azul': {
          DEFAULT: '#2dd4bf',
          'activo': '#0d9488',
        },
        'verde': {
          DEFAULT: '#22c55e',
          'activo': '#15803d',
        },
        'gris': {
          DEFAULT: '#7e8188',
          'activo': '56585d',
        },
      }
    },
  },
  plugins: [],
}

