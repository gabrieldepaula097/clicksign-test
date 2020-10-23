module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        'light-yellowish-green': '#dbff90',
        salmon: '#fa7268',
        dark: '#2a2d3b',
        'pale-lilac': '#e4e7f4',
        'cloudy-blue': '#c0c3d2',
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
      },
      minHeight: {
        container: 'calc(100vh - 80px)',
      },
    },
  },
  variants: {},
  plugins: [],
}
