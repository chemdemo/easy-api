/*
 * @Author: dmyang
 * @Date:   2016-10-11 17:56:02
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-11-20 01:14:19
 */

const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./webpack.base')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH, LOADERS } = CONFIG

module.exports = {
    devtool: 'eval',
    entry: {
        main: [
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client?reload=true&quiet=true&noInfo=true',
            CLIENT_ENTRY
        ],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'aphrodite'
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        path: CLIENT_OUTPUT
    },
    module: {
        preLoaders: [{
            // set up standard-loader as a preloader
            test: /\.jsx?$/,
            loader: 'standard',
            exclude: /(node_modules)/
        }],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|server)/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ].concat(LOADERS)
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
    standard: {
        // config options to be passed through to standard e.g.
        parser: 'babel-eslint'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].css')
    ],
}
