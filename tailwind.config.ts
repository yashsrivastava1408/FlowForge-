import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#030712', // Deep Amethyst Ink
          light: '#111827',
          lighter: '#1f2937',
        },
        accent: {
          DEFAULT: '#f59e0b', // Radiant Amber
          dark: '#d97706',
          light: '#fbbf24',
        },
        royal: {
          DEFAULT: '#6366f1', // Electric Indigo
          dark: '#4f46e5',
          light: '#818cf8',
        },
        emerald: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        slate: {
          950: '#020617',
        }
      },
      fontFamily: {
        display: ['"Outfit"', 'ui-sans-serif', 'system-ui'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
        premium: '0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        glass: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)',
        'gradient-premium': 'linear-gradient(135deg, #030712 0%, #1e1b4b 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
