var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './app/main.js'),
    output: {
        path: path.resolve(__dirname, './'),
        sourceMapFilename: './src/bundle.map',
        filename: './src/bundle.js'
    },
    devtool: '#source-map',
    plugins: [
        new webpack.DefinePlugin({
            // 消除警告
            "process.env": {
                NODE_ENV: JSON.stringify("dev")
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css?modules&localIdentName=[local]-[hash:base64:5]"
            }
        ]
    }
};