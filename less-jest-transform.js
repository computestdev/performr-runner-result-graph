'use strict';

exports.getCacheKey = () => 'less-jest-transform';
exports.process = () => `
exports.refCount = 0;
exports.ref = () => { ++exports.refCount; }
exports.unref = () => { --exports.refCount; }
`;
