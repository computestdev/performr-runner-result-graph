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
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-es2015-modules-commonjs'],
                    presets: ['es2016', 'es2017'],
                },
                test: /\.js$/,
            },
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-es2015-modules-commonjs'],
                    presets: ['react', 'es2016', 'es2017'],
                },
                test: /\.jsx$/,
            },
            {
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                test: /\.scss$/,
            },
        ],
        preLoaders: [
            {
                exclude: /node_modules/,
                loader: 'eslint-loader',
                test: /\.jsx?$/,
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
        extensions: ['', '.js', '.jsx'],
    },
};
