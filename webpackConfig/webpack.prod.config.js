const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = {
    mode: 'production',
    entry: path.join(__dirname,"../src/index.js"),
    output: {
        path: path.join(__dirname,"../lib/"),
        filename: 'index.js',
        libraryTarget: 'umd',// 采用通用模块定义
        libraryExport: 'default'
    },
    externals: /^(react|babel-runtime)/,
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
}
module.exports = merge(prodConfig,baseConfig);