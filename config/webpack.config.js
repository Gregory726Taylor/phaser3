'use strict';

const webpack = require('webpack');
const exec = require('child_process').exec;

const devtool = 'source-map';

const config = {
    devtool,
    mode: 'development',
    context: `${__dirname}/../src/`,
    watch: true,
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
    module: {
        rules: []
    },
    resolve: {
        extensions: ['.js']
    },
    performance: { hints: false },
    plugins: [
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof WEBGL_DEBUG": JSON.stringify(true),
            "typeof EXPERIMENTAL": JSON.stringify(true),
            "typeof PLUGIN_3D": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
            "typeof FEATURE_SOUND": JSON.stringify(true)
        })
    ],
    stats: {
        colors: true,
        chunks: true,
        children: false,
    }
};

if (config.mode === 'production') {
    config.optimization = {
        minimize: true,
        minimizer: [new webpack.optimize.UglifyJsPlugin()],
        usedExports: true,
        sideEffects: true,
    };
}

config.plugins.push(
    new webpack.ProgressPlugin(),
    {
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                exec('node scripts/copy-to-examples-watch.js', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                    }
                    if (
