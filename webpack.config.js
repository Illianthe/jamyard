const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development' ? true : false;

function getPlugins() {
  plugins = [];

  if (isDev) {
    plugins.push(new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./dist']
      }
    }));
  }

  plugins.push(new HTMLWebpackPlugin({
    template: './src/index.html'
  }));

  plugins.push(new CopyWebpackPlugin([
    {
      from: './src/assets',
      to: './assets'
    }
  ]));

  return plugins;
}

module.exports = {
  entry: {
    application: ['./src/app.js']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  plugins: getPlugins(),

  watch: isDev ? true : false
}
