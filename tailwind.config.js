/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#FFFDF9',
        'canvas-tint': '#FAF6F0',
        'soft-sky': '#E2F1F8',
        'soft-sky-dark': '#CDE7F4',
        brutal: {
          dark: '#1E293B',
          black: '#0F172A',
          green: '#22C55E',
          'green-dark': '#16A34A',
          'green-light': '#DCFCE7',
          sky: '#BAE6FD',
          peach: '#FED7AA',
          rose: '#FECDD3',
          lavender: '#DDD6FE',
          mint: '#BBF7D0',
          yellow: '#FEF08A',
        },
      },
      boxShadow: {
        brutal: '4px 4px 0px #1E293B',
        'brutal-sm': '2px 2px 0px #1E293B',
        'brutal-md': '3px 3px 0px #1E293B',
        'brutal-lg': '6px 6px 0px #1E293B',
        'brutal-xl': '8px 8px 0px #1E293B',
        'brutal-hover': '2px 2px 0px #1E293B',
      },
    },
  },
  plugins: [],
};
