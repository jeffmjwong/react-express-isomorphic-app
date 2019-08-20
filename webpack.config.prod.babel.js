import webpack from 'webpack';
import path from 'path';
import TerserWebpackPlugin from 'terser-webpack-plugin';

export default {
  mode: 'production',
  entry: path.resolve(__dirname, 'client/'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_URL': JSON.stringify('http://localhost:3001/')
      }
    })
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
  },
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
