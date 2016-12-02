/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-02 11:46:31
*/

'use strict'

import path from 'path'

const env = process.env.NODE_ENV || 'development'

global.__PROD__ = /production|prod/.test(env)
global.__DEV__ = /development|dev/.test(env)

module.exports = {
    host: '0.0.0.0',
    port: process.env.PORT || (__PROD__ ? 5000 : 4000),
    timeout: 29000,
    hmr: true,
    mysql: {
        host: '',
        port: ''
    },
    admin: ['admin:admin123'],
    log: {
        root: path.resolve(__dirname, 'logs'),
        appenders: [
            {type: 'console', category: 'daily'},
            {type: 'console', category: 'mysql'},
            {type: 'console', category: 'mongodb'},
            // {type: 'file', category: 'daily', filename: 'daily.log', maxLogSize: 1024000, backups: 3},
            // {type: 'file', category: 'mysql', filename: 'mysql.log', maxLogSize: 1024000, backups: 5},
            // {type: 'file', category: 'mongodb', filename: 'mongodb.log', maxLogSize: 1024000, backups: 5},
        ]
    }
}
