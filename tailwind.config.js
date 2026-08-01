/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ordo: {
          bg: '#08090C',
          card: '#0F1117',
          cardHover: '#161922',
          border: '#1E2330',
          borderHighlight: '#2E364A',
          text: '#F1F5F9',
          muted: '#8A94A6',
          subtle: '#475569',
          accent: {
            cyan: '#06B6D4',
            violet: '#8B5CF6',
            emerald: '#10B981',
            amber: '#F59E0B',
            rose: '#F43F5E'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: 0.4, transform: 'scale(0.98)' },
          '100%': { opacity: 0.8, transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
