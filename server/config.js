/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-20 00:34:05
*/

'use strict'

import path from 'path'

module.exports = {
    env: process.env.NODE_ENV || 'development',
    host: '0.0.0.0',
    port: process.env.PORT || 5000,
    timeout: 29000,
    hmr: true,
    mysql: {
        host: '',
        port: ''
    },
    admin: [],
    log: {
        root: path.resolve(__dirname, 'logs'),
        appenders: [
            {type: 'console', category: 'daily'},
            {type: 'console', category: 'mysql'},
            // {type: 'file', category: 'daily', filename: 'daily.log', maxLogSize: 1024000, backups: 3},
            // {type: 'file', category: 'mysql', filename: 'mysql.log', maxLogSize: 1024000, backups: 5},
        ]
    }
}
