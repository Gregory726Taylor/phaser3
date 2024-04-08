'use strict';

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    mode: isProduction ? 'production' : 'development',

    context: path.resolve(__dirname, '../src/'),

    entry: {
        'phaser-facebook-instant-games': './phaser.js',
        'phaser-facebook-instant-games.min': './phaser.js'
    },

    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js',
        library: 'Phaser',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    performance: { hints: false },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof EXPERIMENTAL": JSON.stringify(false),
            "typeof PLUGIN_3D": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(true),
            "typeof FEATURE_SOUND": JSON.stringify(true)
        })
    ]
};

if (isProduction) {
    config.optimization = {
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false
                    },
                    compress: true,
                    ie8: false,
                    ecma: 5,
                    warnings: false
                }
            })
        ]
    };
}

module.exports = config;
