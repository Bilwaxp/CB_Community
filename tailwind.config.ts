import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CB_Community Neon Palette
        background: '#07051A',
        'neon-violet': '#7B4BFF',
        'neon-cyan': '#4BD8FF',
        'neon-green': '#00FFA3',
        'text-primary': '#FFFFFF',
        'text-secondary': '#BFC9D9',
        'glow-violet': 'rgba(123,75,255,0.18)',
        'glow-cyan': 'rgba(75,216,255,0.18)',
        'glow-green': 'rgba(0,255,163,0.18)',
        // Surface colors
        'surface-dark': '#0D0B24',
        'surface-light': '#14122E',
        'border-glow': 'rgba(123,75,255,0.3)',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(135deg, #7B4BFF 0%, #4BD8FF 50%, #00FFA3 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(123,75,255,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(180deg, rgba(123,75,255,0.08) 0%, rgba(75,216,255,0.04) 100%)',
      },
      boxShadow: {
        'neon-violet': '0 0 20px rgba(123,75,255,0.5), 0 0 40px rgba(123,75,255,0.3)',
        'neon-cyan': '0 0 20px rgba(75,216,255,0.5), 0 0 40px rgba(75,216,255,0.3)',
        'neon-green': '0 0 20px rgba(0,255,163,0.5), 0 0 40px rgba(0,255,163,0.3)',
        'glow-sm': '0 0 10px rgba(123,75,255,0.3)',
        'glow-md': '0 0 20px rgba(123,75,255,0.4)',
        'glow-lg': '0 0 40px rgba(123,75,255,0.5)',
        'glass': '0 8px 32px rgba(0,0,0,0.37)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123,75,255,0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(123,75,255,0.8)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;













