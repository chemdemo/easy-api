/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-01 15:05:22
*/

'use strict';

import http from 'http'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import koa from 'koa'
import kRouter from 'koa-router'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { StyleSheetServer } from 'aphrodite'
import serve from 'koa-static'
import webpack from 'webpack'
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// import favicon from './favicon.ico'

import webpackConfig from '../tools/webpack.client.dev'
import { compileDev } from '../tools/dx'
import { configureStore } from '../share/store'
import reducer from '../share/createReducer'
import createRoutes from '../share/routes'

const promiseMatch = (location) => {
    return new Promise((resolve, reject) => {
        match(location, (err, redirectLocation, renderProps) => {
            if(err) return reject({ err })
            if(redirectLocation) return reject({ redirectLocation })
            if(renderProps) return resolve(renderProps)
            reject()
        })
    })
}

const App = (config) => {
    // console.log(config)
    const __PROD__ = /production|prod/.test(config.nodeEnv)
    const app = koa()
    const router = kRouter()

    app.on('error', (err, ctx) => {
        err.url = err.url || ctx.request.url
        console.error(err.stack, ctx)
    })

    // handle favicon.ico
    app.use(function*(next) {
        if (this.url.match(/favicon\.ico$/)) return this.body = ''
        yield next
    })

    // logger
    app.use(function*(next) {
        console.log(this.method, this.url)
        yield next
    })

    app.use(serve(config.staticDir, {
        maxage: 0
    }))

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

    router.get('*', function*(next) {
        yield ((callback) => {
            const store = configureStore({
                sourceRequest: {
                    protocol: this.headers['x-forwarded-proto'] || this.protocol,
                    host: this.headers.host
                }
            })
            const routes = createRoutes(store)
            const history = createMemoryHistory(this.url)
            const { dispatch } = store

            match({routes, history}, (err, redirectLocation, renderProps) => {
                console.log(err, redirectLocation, renderProps)
                if (redirectLocation) {
                    this.redirect(redirectLocation.pathname + redirectLocation.search, '/')
                    return
                }

                if (err || !renderProps) {
                    callback(err)
                    return
                }

                const { components } = renderProps

                const locals = {
                    path: renderProps.location.pathname,
                    query: renderProps.location.query,
                    params: renderProps.params,
                    dispatch
                }

                trigger('fetch', components, locals)
                    .then(() => {
                        const initialState = store.getState()
                        const InitialView = (
                            <Provider store={store}>
                                <RouterContext {...renderProps} />
                            </Provider>
                        )
                        const { html, css} = StyleSheetServer.renderStatic(() => ReactDOMServer.renderToString(InitialView))
                        const body = `
                            <!doctype html>
                            <html>
                                <head>
                                    <meta charset="utf-8" />
                                    <title>react-isomorphic-app</title>
                                    <style data-aphrodite>${css.content}</style>
                                    <script>
                                        window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};
                                        window.INITIAL_STATE = ${JSON.stringify(initialState)};
                                    </script>
                                </head>
                                <body>
                                    <div id="root">${html}</div>
                                    <script src="${ __PROD__ ? assets.vendor.js : '/vendor.js' }"></script>
                                    <script async src="${ __PROD__ ? assets.main.js : '/main.js' }" ></script>
                                </body>
                            </html>
                        `

                        this.type = 'text\/html'
                        this.body = body

                        callback(null)
                    })
                    .catch(e => {
                        callback(e)
                    })
            })
        })
    })

    // use routes
    app.use(router.routes()).use(router.allowedMethods())

    return app
}

export default App
