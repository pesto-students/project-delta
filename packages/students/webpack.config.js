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
    ],
  },
  plugins: [htmlPlugin, openPlugin],
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
};

module.exports = config;
