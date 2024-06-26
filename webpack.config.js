const path = require('path');// подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин cleanWebpack 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// подключили плагин css

module.exports = {
  entry: {main: './src/scripts/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
            publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,

    open: true
  },
  stats: {
    children: true,
  },
  module: {
  rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource'
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { importLoaders: 1 }
      },
      'postcss-loader']
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};