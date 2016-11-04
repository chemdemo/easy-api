/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-04 19:59:24
*/

'use strict'

// import 'babel-polyfill'

import http from 'http'
import path from 'path'

import opn from 'opn'

import App from './app'
import { startDev } from '../tools/dx'
import serverConf from './config'

const assetspath = path.resolve(process.cwd(), 'public')
const viewpath = path.resolve(__dirname, 'view')
const config = {...serverConf, assetspath, viewpath}

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
