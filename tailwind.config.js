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
          DEFAULT: '#74f953',
          'activo': '#27ac06',
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

