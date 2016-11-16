/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:27:23
*/

'use strict'

const env = process.env.NODE_ENV || 'development'

global.__PROD__ = /production|prod/.test(env)
global.__DEV__ = /development|dev/.test(env)

module.exports = {
    port: process.env.PORT || 5000,
    timeout: 29000,
    hmr: true
}
