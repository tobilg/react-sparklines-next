var path = require('path');

module.exports = {
    mode: 'development',
    entry: './demo.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'demo.build.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    devServer: {
        static: {
            directory: __dirname
        },
        compress: true,
        port: 8080
    }
};
