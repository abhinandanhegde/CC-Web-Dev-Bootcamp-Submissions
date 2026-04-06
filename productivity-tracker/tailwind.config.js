/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        amber: {
          400: '#f5c518',
          500: '#e6b800',
        },
        surface: {
          DEFAULT: '#0d0d14',
          card: '#12121e',
          hover: '#181826',
          border: '#1e1e30',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
