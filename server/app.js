/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-10-21 16:26:12
*/

'use strict';

import http from 'http'
import path from 'path'

import koa from 'koa'
import kRouter from 'koa-router'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { StyleSheetServer } from 'aphrodite'
import serve from 'koa-static'
// import Transmit from 'react-transmit'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import favicon from 'favicon.ico'

import webpackConfig from '../tools/webpack.client.dev'
import { compileDev } from '../tools/dx'
import { configureStore } from '../share/store'
import reducer from '../share/createReducer'
import createRoutes from '../share/routes/root'

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
    const __PROD__ = /production|prod/.test(config.nodeEnv)
    const app = koa()
    const router = kRouter()

    app.on('error', (err, ctx) => {
        err.url = err.url || ctx.request.url
        console.error(err.stack, ctx)
    })

    // handle favicon.ico
    app.use(function*(next) {
        if (this.url.match(/favicon\.ico$/)) this.body = ''
        yield next
    })

    // logger
    app.use(function*(next) {
        console.log(this.method.info, this.url)
        yield next
    })

    if(!__PROD__ && config.hrm) {
        const compiler = compileDev((webpack(webpackConfig)), config.port)
        app.use(webpackDevMiddleware(compiler, {
            quiet: true,
            watchOptions: {
                ignored: /node_modules/
            }
        }))
        app.use(webpackHotMiddleware(compiler, { log: console.log }))
    }

    app.use(serve(config.staticDir, {
        maxage: 0
    }))

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
                if (redirectLocation) {
                    this.redirect(redirectLocation.pathname + redirectLocation.search, '/')
                    return
                }

                if (err || !renderProps) {
                    callback(err)
                    return
                }

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
                        const { html, css} = StyleSheetServer.renderStatic(() => ReactDOMServer.renderToString(<InitialView />))
                        const body = `
                            <!doctype html>
                            <html>
                                <head>
                                    <meta charset="utf-8" />
                                    <title>react-isomorphic-app</title>
                                    <link rel="shortcut icon" href="${favicon}" />
                                    <style data-aphrodite>${css.content}</style>
                                </head>
                                <body>
                                    <div id="root">${html}</div>
                                    <script>window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};</script>
                                    <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
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

export { App }
