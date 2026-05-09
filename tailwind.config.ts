import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        lead: '#141414',
        charcoal: '#1E1E1E',
        silver: '#8A9099',
        'silver-light': '#C0C8D0',
        gold: '#C8972A',
        'gold-light': '#E8B84B',
        'gold-dim': '#9A6E1A',
        white: '#F5F5F5',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C8972A, #E8B84B)',
        'gold-gradient-h': 'linear-gradient(90deg, transparent, #C8972A, transparent)',
      },
      boxShadow: {
        'gold-sm': '0 4px 20px rgba(200, 151, 42, 0.1)',
        'gold-md': '0 8px 40px rgba(200, 151, 42, 0.15)',
        'gold-lg': '0 20px 60px rgba(200, 151, 42, 0.2)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 151, 42, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(200, 151, 42, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
