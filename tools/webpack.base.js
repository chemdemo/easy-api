/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-01 17:33:10
*/

const path = require('path')

module.exports = {
    CLIENT_ENTRY: path.join(process.cwd(), 'client'),
    CLIENT_OUTPUT: path.join(process.cwd(), 'public/assets'),
    SERVER_ENTRY: path.join(process.cwd(), 'server'),
    SERVER_OUTPUT: path.join(process.cwd(), 'build'),
    PUBLIC_PATH: '/assets/',
    LOADERS: [
        {
            test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
            loaders: [
                'url?limit=10000&name=img/[hash:8].[name].[ext]',
                'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
            ]
        },
        {
            test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
            loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
        },
        {test: /\.css$/, loader: ['style', 'css']},
        {test: /\.scss$/, loader: ['style', 'css', 'sass']},
    ]
}
