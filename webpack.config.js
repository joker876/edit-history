const path = require('path');

module.exports = {
    entry: './dist/index.js',
    mode: 'production',
    output: {
        filename: 'infinite-loop-detector.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'InfiniteLoopDetector',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        auxiliaryComment: 'Detect Infinite Loop',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'PLAYGROUND'),
        },
        filename: 'infinite-loop-detector.min.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'InfiniteLoopDetector',
        compress: true,
        port: 9000,
    },
};