const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    // path: __dirname+'/public/',
    path: path.resolve(__dirname, "public"),
    // publicPath: "http://localhost:3000/",
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    // inline: true,
    host: '0.0.0.0',
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
    stats: "errors-only",
    // open the default web browser when the server start,
    open: true, 
    openPage: '',
    // 웹 브라우저 새로고침을 해도 동작하도록 하는 옵션 (서버 요청을 index.html로 하고 그 이후에 router를 태움)
    historyApiFallback: true,
    compress: true,
  },

  externals: {
    Config:  "configs", 
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

  resolve: {
    extensions: ["js", "jsx"]
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
