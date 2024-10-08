/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        customBrown: '#675143',
        customMint: '#5ECDC7',
        customPink: '#EF8491',
        customYellow: '#F2D077',
        customGrey: '#CECECE', // 수정된 색상 키
        customBackground: '#F2F2F2',
        customChatBackground: '#EAEAEA',
      },
      boxShadow: {
        customShadow: '0px 0px 20px -8px rgba(0,0,0,0.2)',
        GridDiv: '0px 0px 28px -12px rgba(0, 0, 0, 0.16)',
      },
      fontSize: {
        size24: '24px', // 커스텀 폰트 사이즈 추가
      },
      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
      },
    },
    fontFamily: {
      Pretendard: ['Pretendard'],
      Roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};
