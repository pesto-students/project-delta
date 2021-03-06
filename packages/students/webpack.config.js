const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const openPlugin = new OpenBrowserPlugin({
  url: 'http://localhost:8080',
});

const config = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: `${path.resolve(__dirname)}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loaders: [
        'babel-loader',
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      ],
    },
    {
      test: /\.(jpg|jpeg|png|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240, // images larger than 10kB will not be bundled
            name: 'images/[name]-[hash].[ext]',
          },
        },
      ],
    },
    ],
  },
  plugins: [htmlPlugin, openPlugin],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};

module.exports = config;
