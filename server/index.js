/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-03 11:43:07
*/

'use strict'

// import 'babel-polyfill'

import http from 'http'
import path from 'path'

import opn from 'opn'

import { startDev } from '../tools/dx'
import App from './app'
import serverConf from './config'

const staticDir = path.resolve(process.cwd(), 'public')
const config = {...serverConf, staticDir}

global.__PROD__ = /production|prod/.test(config.nodeEnv)
global.__DEV__ = /development|dev/.test(config.nodeEnv)

const app = App(config)
const server = http.createServer(app.callback())

server.listen(config.port, (err) => {
    if(__PROD__) {
        if(err) console.error(err)
    } else {
        startDev(config.port, err)
    }

    console.log(`server listening on port ${config.port}`)
})
