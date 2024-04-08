'use strict';

const webpack = require('webpack');
const exec = require('child_process').exec;

const config = {
    devtool: 'source-map',
    mode: 'development',
    context: `${__dirname}/../src/`,
    entry: {
        phaser: './phaser.js'
    },
    output: {
        path: `${__dirname}/../build/`,
        globalObject: 'this',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]', // string
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]', // string
        filename: '[name].js',
        library: {
            name: 'Phaser',
            type: 'umd',
            umdNamedDefine: true,
        }
    },
    performance: { hints: false },
    module: {
        rules: []
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof WEBGL_DEBUG": JSON.stringify(false),
            "typeof EXPERIMENTAL": JSON.stringify(true),
            "typeof PLUGIN_3D": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
            "typeof FEATURE_SOUND": JSON.stringify(true)
        }),
        new webpack.BannerPlugin({
            banner: 'This file is created by webpack',
            raw: true,
        }),
        new webpack.WatchIgnorePlugin({
            paths: [/node_modules/],
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec('node scripts/copy-to-examples-watch.js', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        }
    ]
};

module.exports = config;
