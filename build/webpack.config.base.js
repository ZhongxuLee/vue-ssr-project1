const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 拆分 css 文件eslint-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css 环境检查
// const postcssPresetEnv = require('postcss-preset-env');
// css 压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const plugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../src/index.html'),
    favicon: path.join(__dirname, '../src/assets/favicon.ico'),
  }),
  new MiniCssExtractPlugin({
    filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:10].css',
  }),
  new OptimizeCssAssetsWebpackPlugin(),
  new CleanWebpackPlugin(),
];

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
          ],
        ],
      },
    },
  },
];

const config = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: isDev ? 'js/[name].js' : 'js/[name].bundle.[contenthash:10].js',
    chunkFilename: 'js/[name]_chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: commonCssLoader,
      },
      {
        test: /\.less$/,
        use: [
          ...commonCssLoader,
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[hash:10].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins,
};

module.exports = config;
