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
        'table-border': '#e1e1e1',
        'very-light-pink': '#fff3f2',
        'bluey-grey': '#9198af',
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
      },
      minHeight: {
        container: 'calc(100vh - 80px)',
      },
      height: {
        'modal-create': '223px;',
        'modal-delete': '104px',
      },
      width: {
        '60px': '60px',
        '135px': '135px',
        '144px': '144px',
        '148px': '148px',
        search: 'calc(100% - 300px)',
      },
      borderRadius: {
        '4px': '4px',
        '16px': '16px',
      },
      spacing: {
        '32px': '32px',
      },
    },
  },
  variants: {},
  plugins: [],
}
