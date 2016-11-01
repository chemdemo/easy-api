/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-01 12:12:51
*/

'use strict'

const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    webConcurrency: process.env.WEB_CONCURRENCY || 1,
    port: process.env.PORT || 5000,
    timeout: 29000,
    hmr: true
}

module.exports = config
