const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new CopyWebpackPlugin([{from: path.join('src/index.css'), to: '.'}]),
      new CopyWebpackPlugin([{from: path.join('src/index.json'), to: '.'}]),
      new CopyWebpackPlugin([{from: path.join('src/manifest.json'), to: '.'}]),

    ],
  },
];
