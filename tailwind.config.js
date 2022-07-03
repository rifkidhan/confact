/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      fontFamily: {
        koulen: ['Koulen-Regular', 'sans-serif'],
        general: ['GeneralSans-Variable', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'primary-2': 'var(--primary-2)',
        'secondary-2': 'var(--secondary-2)',
        'primary-3': 'var(--primary-3)',
        'secondary-3': 'var(--secondary-3)',

        crayola: 'var(--crayola)',
        coral: 'var(--coral)',
        misty: 'var(--misty)',
        mango: 'var(--mango)',
        sunny: 'var(--sunny)',
        linen: 'var(--linen)',
        seaform: 'var(--seaform)',
        opal: 'var(--opal)',
        oyster: 'var(--oyster)',
        timber: 'var(--timber)',
        offwhite: '#f5f5f5',

        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
        red: {
          500: '#E9ECED',
          400: '#E54D80',
          300: '#EC799F',
          200: '#F2A6BF',
          100: '#F9D2DF',
        },
        cyan: {
          500: '#40AABF',
          400: '#66BBCC',
          300: '#8CCCD9',
          200: '#B2DDE6',
          100: '#D9EEF2',
        },
        purple: {
          500: '#6A40BF',
          400: '#8866CC',
          300: '#A78ED9',
          200: '#C4B3E5',
          100: '#E1D9F2',
        },
        yellow: {
          500: '#F2CC0D',
          400: '#F5D63D',
          300: '#F7E16F',
          200: '#FAEB9E',
          100: '#FCF5CF',
        },
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
