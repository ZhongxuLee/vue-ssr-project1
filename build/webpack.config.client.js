const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const config = merge({}, baseConfig, {
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8001,
  }
});

module.exports = config;
