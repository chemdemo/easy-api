/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-04 21:28:49
*/

'use strict';

import http from 'http'
import path from 'path'

import koa from 'koa'
import ejs from 'koa-ejs'
import kRouter from 'koa-router'
import serve from 'koa-static'
import webpack from 'webpack'
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../tools/webpack.client.dev'
import { compileDev } from '../tools/dx'
import setupPageRoutes from './routes/page'
import setupAPIRoutes from './routes/api'

const App = (config) => {
    // console.log(config)
    const app = koa()
    const router = kRouter()

    setupAPIRoutes(router, app)
    setupPageRoutes(router, app)

    app.on('error', (err, ctx) => {
        err.url = err.url || ctx.request.url
        console.error(err.stack, ctx)
    })

    // handle favicon.ico
    app.use(function*(next) {
        if (this.url.match(/favicon\.ico$/)) return this.body = ''
        yield next
    })

    // handler view
    ejs(app, {
        root: config.viewpath,
        viewExt: 'html',
        layout: false,
        cache: __PROD__ ? true : false,
        debug: __PROD__ ? false : true
    })

    // logger
    app.use(function*(next) {
        console.log(this.method, this.url)
        yield next
    })

    app.use(serve(config.assetspath, { maxage: 0 }))

    if(!__PROD__ && config.hmr) {
        const compiler = compileDev((webpack(webpackConfig)), config.port)
        const hotMiddleware = webpackHotMiddleware(compiler)

        app.use(koaWebpackDevMiddleware(compiler, {
            quiet: true,
            watchOptions: {
                ignored: /node_modules/
            }
        }))

        app.use(function* (next) {
            yield hotMiddleware.bind(null, this.req, this.res)
            yield next
        })
    }

    // use routes
    app.use(router.routes())

    return app
}

export default App
