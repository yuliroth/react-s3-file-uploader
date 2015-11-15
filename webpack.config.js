const path = require('path');

module.exports = {

    context: __dirname,
    entry: ['./index.jsx',],
    resolve: {
        root: [
            path.join(__dirname),
        ],
        extensions: ['', '.js', '.jsx'],
    },

    resolveLoader: {
        extensions: ['', '.js', '.jsx', '.css'],
    },
    output: {
        filename: 'lib/index.js',
        path: __dirname,
    },

    module: {
        preLoaders: [
            { test: /\.json$/, loader: 'json' },
        ],
        loaders: [
            {
                test: /\.(jsx|js)$/,
                loaders: ['babel?stage=1', 'babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
            },
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer?browsers=last 2 versions',
            },
        ],
    },
};
