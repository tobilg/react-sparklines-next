var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        index: './index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
        library: {
            name: 'ReactSparklines',
            type: 'umd'
        },
        globalObject: 'this'
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
};
