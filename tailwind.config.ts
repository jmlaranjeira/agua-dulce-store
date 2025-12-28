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
        // Paleta elegante para joyería
        gold: {
          50: '#FDF8F0',
          100: '#F9EDD8',
          200: '#F0D9A8',
          300: '#E5C170',
          400: '#D4A84B',
          500: '#B8860B',  // Dorado principal
          600: '#9A7209',
          700: '#7C5C07',
          800: '#5E4505',
          900: '#3F2E03',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FDF8F3',   // Fondo principal
          200: '#F9F1E8',
          300: '#F2E6D9',
          400: '#E8D6C4',
          500: '#D9C4AC',
        },
        warm: {
          50: '#F7F5F3',
          100: '#EBE7E3',
          200: '#D5CFC8',
          300: '#B5ACA1',
          400: '#8F8275',
          500: '#6B5B4F',   // Gris cálido texto secundario
          600: '#574A40',
          700: '#453B33',
          800: '#2D2A26',   // Casi negro - texto principal
          900: '#1A1816',
        },
        rose: {
          50: '#FDF8F8',
          100: '#F8EDED',
          200: '#E8D4D4',   // Rosa empolvado
          300: '#D4B5B5',
          400: '#C09595',
          500: '#A67777',
        },
        sage: {
          100: '#E8EDE6',
          200: '#C8D4C2',
          300: '#A8B5A0',   // Verde salvia
          400: '#8A9C80',
          500: '#6C8260',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.4)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(37, 211, 102, 0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
