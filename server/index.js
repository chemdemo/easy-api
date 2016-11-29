/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 20:35:47
*/

'use strict'

// import 'babel-polyfill'

import http from 'http'
import path from 'path'

import opn from 'opn'

import serverConf from './config'
import { startDev } from '../tools/dx'
import App from './app'

const assetspath = path.resolve(process.cwd(), 'public')
const viewpath = path.resolve(__dirname, 'view')
const config = {...serverConf, assetspath, viewpath}

const app = App(config)
const server = http.createServer(app.callback())

server.listen(config.port, config.host, err => {
    if(__PROD__) {
        if(err) console.error(err)
    } else {
        startDev(config.port, err)
    }

    console.log(`server listening on port ${config.port}`)
})
