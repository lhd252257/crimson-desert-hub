/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C8A96E',   // 官网金色
          accent: '#E2C98A',    // 亮金高亮
          dark: '#0D0B08',      // 极深黑褐
          card: '#16130E',      // 深褐卡片
          card2: '#1E1A12',     // 次级卡片
          border: '#2E2820',    // 金褐描边
          muted: '#8A7A5A',     // 暗金文字
        },
      },
      fontFamily: {
        sans: ['Cinzel', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '50%': { width: '50%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        loading: 'loading 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
