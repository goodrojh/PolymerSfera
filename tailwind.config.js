/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#06192e',
          900: '#0a2240',
          800: '#0e2d52',
          700: '#143a68',
        },
        cyan: {
          400: '#22b8d8',
          500: '#0ea5c4',
          600: '#0b8aa6',
        },
        ink: '#0b1622',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(14,165,196,0.45)',
        card: '0 12px 40px -12px rgba(10,34,64,0.18)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shine: 'shine 6s linear infinite',
      },
    },
  },
  plugins: [],
}
