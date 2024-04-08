'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {
    mode: 'development',

    context: path.resolve(__dirname, '../src/'),

    entry: {
        phaser: './phaser.js'
    },

    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: 'phaser-facebook-instant-games.js',
        library: 'Phaser',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]', // string
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]', // string
        umdNamedDefine: true
    },

    performance: { hints: false },

    module: {
        rules: []
    },

    resolve: {
        extensions: ['.js']
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            CANVAS_RENDERER: true,
            WEBGL_RENDERER: true,
            EXPERIMENTAL: false,
            PLUGIN_3D: false,
            PLUGIN_CAMERA3D: false,
            PLUGIN_FBINSTANT: true,
            FEATURE_SOUND: true
        })
    ],

    devtool: 'source-map'
};

config.plugins.push({
    apply: (compiler) => {
        compiler.hooks.done.tap('AfterEmitPlugin', (stats) => {
            exec('node scripts/copy-to-examples-fb.js', (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
            });
        });
    }
});

module.exports = config;
