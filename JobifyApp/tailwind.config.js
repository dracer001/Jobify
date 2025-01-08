/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'zoom-1': 'zoom 1.5s ease-in-out infinite',
        'zoom-2': 'zoom 1.5s ease-in-out infinite 0.3s',
        'zoom-3': 'zoom 1.5s ease-in-out infinite 0.6s',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'drop-in': 'drop-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-out forwards',

      },
      keyframes: {
        'zoom': {
          '0%, 100%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.2)' },
        },
        'drop-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}


