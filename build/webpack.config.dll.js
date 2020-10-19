const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vue: ['vue'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../dist/dll'),
    library: '[name]_[hash]', // 打包的库里向外暴露的名字
  },
  plugins: [
    // 打包生成一个 manifest.json，提供映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, '../dist/dll/manifest.json'),
    }),
  ],
  mode: 'production',
};
