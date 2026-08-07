/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        accent: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#9333ea',
        },
        dark: {
          DEFAULT: '#030014',
          100: '#0a0520',
          200: '#110a30',
          300: '#1a1040',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'spin-slower': 'spin 15s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 8s infinite',
        'gradient': 'gradient 8s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'radar': 'radar 4s linear infinite',
        'border-beam': 'border-beam 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(25px, -35px) scale(1.15)' },
          '50%': { transform: 'translate(-25px, 25px) scale(0.85)' },
          '75%': { transform: 'translate(35px, 15px) scale(1.08)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}
