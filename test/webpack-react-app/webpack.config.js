const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CyCSSWebpackPlugin } = require('@cypress-design/css')

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 5173,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    CyCSSWebpackPlugin({
      scan: {
        include: [
          'src/**/*.@(tsx|ts|js)',
          '../../components/*/react/dist/*.@(js|css)',
        ],
      },
    }),
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        htmlWebpackPlugin.options.title +
        '</title></head><body><div id="app"></div></body></html>',
      filename: 'index.html',
    }),
  ],
}

module.exports = config
