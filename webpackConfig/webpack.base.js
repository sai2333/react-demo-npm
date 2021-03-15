const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换。
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
};
