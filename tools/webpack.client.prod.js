/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 20:37:40
*/

const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CONFIG = require('./webpack.base')
const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH, LOADERS} = CONFIG

const extractCSS = new ExtractTextPlugin('[name]_[contenthash:20].css')

module.exports = {
    devtool: false,
    entry: {
        main: [CLIENT_ENTRY],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'aphrodite'
        ],
    },
    output: {
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: PUBLIC_PATH,
        path: CLIENT_OUTPUT
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            '__DEV__': false
        }),
        extractCSS,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js', 2),
        new AssetsPlugin({ filename: path.resolve(CLIENT_OUTPUT, 'sourcemap.json') }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ["es2015", "react", "stage-0", "react-optimize"]
                },
                exclude: /(node_modules)/
            },
            {test: /\.css$/, loader: extractCSS.extract('style', ['css'])},
            {test: /\.scss$/, loader: extractCSS.extract('style', ['css', 'sass'])}
        ]
    }
}
