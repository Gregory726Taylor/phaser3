'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  context: srcDir,
  entry: {
    camera3d: './Camera3DPlugin.js',
    'camera3d.min': './Camera3DPlugin.js'
  },
  output: {
    path: distDir,
    filename: '[name].js',
    library: 'Camera3DPlugin',
    libraryTarget: 'var'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        include: /\.min\.js$/,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: true,
          ie8: false,
          ecma: 5,
          output: {comments: false},
          warnings: false
        },
        warningsFilter: () => false
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '# Camera3DPlugin - Do not modify this file',
      entryOnly: true,
      exclude: /\.min\.js$/
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

