/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-10-20 10:54:09
*/

'use strict';

import http from 'http'
import path from 'path'

import opn from 'opn'

import { startDev } from '../tools/dx'
import { App } from './app'
import serverConf from './config'

const staticDir = path.resolve(__dirname, 'public')

const config = {...serverConf, staticDir}
const app = App(config)
const server = http.createServer(app)

server.listen(config.port, err => {
    const __PROD__ = /production|prod/.test(config.nodeEnv)

    if(__PROD__) {
        if(err) console.error(err)
        else console.log(`server listening on port ${config.port}`)
    } else {
        startDev(config.port, err)
    }
})
