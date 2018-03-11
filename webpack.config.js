const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['whatwg-fetch', './src/app/index.js'],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|test)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {shippedProposals: true}]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Sky Bikes',
      template: 'src/app/index.html'
    })
  ],
  output: {
    filename: 'skybikes.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
