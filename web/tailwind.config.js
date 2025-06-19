
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6',
    'text-d1', 'text-d2', 'text-d3', 'text-d4', 'text-d5', 'text-d6',
    'text-body-xxl', 'text-body-xl', 'text-body-l', 'text-body-m', 'text-body-s', 'text-body-xs',
    'text-navigation',
    'font-manrope',
  ],
  theme: {
          screens: {
        sm: "100%",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        '2xl': "1320px",
      },
    container: {
      center: true,
      // screens: {
      //   'xl': '95%',       // applies at ≥1200px
      //   '2xl': '1320px',   // applies at ≥1400px
      // },
      padding:{
        DEFAULT: '0.75rem',
      }
    },
    extend: {
      colors: {
        gray: {
          900: '#131022',
          800: '#3E4265',
          700: '#585C7B',
          600: '#9397AD',
          500: '#B4B7C9',
          400: '#D4D7E5',
          300: '#E2E5F1',
          200: '#EFF2FC',
          100: '#F3F6FF',
        },
        primary: {
          brand: '#6366F1',
        },
        text: {
          light: '#3E4265',
        },
      },
      fontFamily: {
        manrope: ['Manrope', '"Source Sans Pro"'],
      },
      spacing: {
        4.5: '18px',
      },
      fontSize: {
        'h1': ['40px', { lineHeight: '130%', fontWeight: '800' }],
        'h2': ['32px', { lineHeight: '130%', fontWeight: '800' }],
        'h3': ['28px', { lineHeight: '130%', fontWeight: '800' }],
        'h4': ['24px', { lineHeight: '140%', fontWeight: '800' }],
        'h5': ['20px', { lineHeight: '140%', fontWeight: '800' }],
        'h6': ['16px', { lineHeight: '140%', fontWeight: '800' }],
        'd1': ['80px', { lineHeight: '130%', fontWeight: '800' }],
        'd2': ['72px', { lineHeight: '130%', fontWeight: '800' }],
        'd3': ['64px', { lineHeight: '130%', fontWeight: '800' }],
        'd4': ['56px', { lineHeight: '130%', fontWeight: '800' }],
        'd5': ['48px', { lineHeight: '130%', fontWeight: '800' }],
        'd6': ['42px', { lineHeight: '130%', fontWeight: '800' }],
        'body-xxl': ['24px', { lineHeight: '160%', fontWeight: '400' }],
        'body-xl': ['20px', { lineHeight: '160%', fontWeight: '400' }],
        'body-l': ['18px', { lineHeight: '160%', fontWeight: '400' }],
        'body-m': ['16px', { lineHeight: '160%', fontWeight: '400' }],
        'body-s': ['14px', { lineHeight: '160%', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '160%', fontWeight: '400' }],
        'navigation': ['16px', { lineHeight: '160%' }],
      },
      boxShadow: {
        'sm': '0 .275rem .75rem -.0625rem rgba(11, 15, 25, 0.06), 0 .125rem .4rem -.0625rem rgba(11, 15, 25, 0.03)',
        'button': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
