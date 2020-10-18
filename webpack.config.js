const WebpackPwaManifest = require('webpack-pwa-manifest');

const config = {
  entry: './public/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      name: 'Budget Tracker App',
      short_name: 'Budget Tracker',
      description: 'App application which allows the user to track income and expenses.',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/'
    }),
  ],
};

module.exports = config;
