/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass-bg': 'rgba(40, 40, 40, 0.35)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
        'glass-shine': 'rgba(255, 255, 255, 0.05)',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(235, 235, 245, 0.6)',
        'accent-gray': 'rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '40px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'sans-serif'],
      },
      backgroundImage: {
        'liquid-dark': `
          radial-gradient(circle at 10% 20%, rgba(50, 50, 50, 0.4) 0%, transparent 40%),
          linear-gradient(115deg, #000 0%, #1a1a1a 40%, #050505 70%, #000 100%),
          repeating-linear-gradient(115deg, transparent 0, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)
        `,
      }
    },
  },
  plugins: [],
}
