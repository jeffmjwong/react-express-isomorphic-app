import webpack from 'webpack';
import path from 'path';
// const HtmlWebpackPlugin = require('html-webpack-plugin');

export default {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'client/')
  ]
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'eval-source-map',
  plugins: [
    // new HtmlWebpackPlugin({ template: './index.html' })
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
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
