'use strict';

const glob = require('glob');
const defaultConfig = require('./webpack.config');

defaultConfig.module.loaders.forEach(loader => {
    if (loader.loaders) {
        loader.loaders = loader.loaders.filter(name => name !== 'style-loader');
    }
});

module.exports = {
    entry: glob.sync('./test/**/*.test.js'),
    module: defaultConfig.module,
    output: {
        filename: 'test-bundle.js',
        path: __dirname,
        publicPath: '/',
    },
    resolve: defaultConfig.resolve,
};
