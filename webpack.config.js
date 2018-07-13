'use strict';

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
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        library: 'PerformrRunnerResultGraph',
        libraryTarget: 'umd',
        path: __dirname,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
