'use strict';

exports.getCacheKey = () => 'sass-jest-transform';
exports.process = () => `
exports.refCount = 0;
exports.ref = () => { ++exports.refCount; }
exports.unref = () => { --exports.refCount; }
`;
