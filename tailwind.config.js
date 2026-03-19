/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1a1a2e',
        'bg-secondary': '#16213e',
        'text-primary': '#ffffff',
        'accent-red': '#e94560',
        'accent-gold': '#ffd700',
        'border-color': '#4a4a6a',
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'flash': 'flash 0.4s ease-in-out',
        'typewriter': 'typewriter 0.05s steps(1) infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
