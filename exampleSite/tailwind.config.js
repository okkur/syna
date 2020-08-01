const colors = {
  primary: '#00838F',
  secondary: '#868e96',
  success: '#008f54',
  info: '#00c9dc',
  warning: '#fdf314',
  danger: '#dc1200',
  light: '#f8f9fa',
  dark: '#343a40',
};

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors,
      backgroundColor: () => ({
        ...colors,
      }),
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
