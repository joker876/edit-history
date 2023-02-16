const path = require('path');

module.exports = {
    entry: './dist/index.js',
    mode: 'production',
    output: {
        filename: 'edit-history.min.js',
        path: path.resolve(__dirname, 'dist/browser'),
        library: 'EditHistory',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        auxiliaryComment: 'An implementation of a simple edit history class.',
    },
    devServer: {
        compress: true,
        port: 9000,
    },
};