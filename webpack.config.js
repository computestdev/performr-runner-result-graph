'use strict';
/* eslint-env node */
const path = require('path');

module.exports = {
    devServer: {
        liveReload: false,
        static: {
            directory: __dirname,
        },
    },
    devtool: 'source-map',
    entry: [
        './src/PerformrRunnerResultGraph.jsx',
    ],
    externals: {
        react: 'React',
    },
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: ['babel-loader'],
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        library: 'PerformrRunnerResultGraph',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    target: 'web',
};
