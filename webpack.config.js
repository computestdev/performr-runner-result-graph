'use strict';
/* eslint-env node */
const path = require('path');

module.exports = {
    devServer: {
        contentBase: './',
    },
    devtool: 'source-map',
    entry: [
        './src/PerformrRunnerResultGraph.jsx',
    ],
    externals: {
        react: 'React',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: ['eslint-loader'],
            },
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
};
