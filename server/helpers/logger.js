/*
* @Author: dmyang
* @Date:   2016-04-13 14:23:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:48:38
*/

'use strict'

const fs = require('fs')
const log4js = require('log4js')

const conf = require('../config')
const logConf = conf.log
const appenders = logConf.appenders

// if(!fs.existsSync(logConf.root)) fs.mkdirSync(logConf.root)
fs.mkdir(logConf.root, err => {})

let loggerConf = { appenders, levels: {} }
let categorires = []

appenders.forEach((item) => {
    categorires.push(item.category)
    loggerConf.levels[item.category] = __DEV__ ? 'DEBUG' : 'INFO'
})

loggerConf.replaceConsole = __PROD__

log4js.configure(loggerConf, {
    cwd: logConf.root
})

categorires.forEach((category) => {
    exports[category] = log4js.getLogger(category)
})
