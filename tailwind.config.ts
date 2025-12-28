import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta suave para joyería femenina
        primary: {
          50: '#fdf8f6',
          100: '#f9ebe4',
          200: '#f5ddd3',
          300: '#e9c4b0',
          400: '#daa68a',
          500: '#c98b6a',
          600: '#b8755a',
          700: '#9a604b',
          800: '#7f5042',
          900: '#694439',
          950: '#38211c',
        },
        secondary: {
          50: '#f8f7f4',
          100: '#efede6',
          200: '#ddd9cc',
          300: '#c7c0ab',
          400: '#afa389',
          500: '#9f8d6f',
          600: '#927d63',
          700: '#7a6753',
          800: '#655547',
          900: '#53473c',
          950: '#2c241f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
