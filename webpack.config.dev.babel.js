import path from 'path';
// const HtmlWebpackPlugin = require('html-webpack-plugin');

export default {
  mode: 'development',
  target: 'node',
  entry: './server/index',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'eval-source-map',
  // plugins: [
  //   new HtmlWebpackPlugin({ template: './index.html' })
  // ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
