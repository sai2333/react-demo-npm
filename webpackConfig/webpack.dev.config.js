const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: path.join(__dirname, '../example/src/app.js'),
  output: {
    path: path.join(__dirname, '../example/src/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ['style-loader','css-loader'],
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.less$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ['style-loader','css-loader','less-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
  //   resolve: {
  //     extensions: ['.json', '.js', '.jsx']
  //   },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../example/src/'),
    compress: true,
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
});
