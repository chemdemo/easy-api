/*
* @Author: dmyang
* @Date:   2016-11-03 11:15:31
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-03 11:44:58
*/

'use strict'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { StyleSheetServer } from 'aphrodite'

import { compileDev } from '../tools/dx'
import { configureStore } from '../share/store'
// import reducer from '../share/createReducer'
import createRoutes from '../share/routes'

const pkg = require('../package.json')

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

const baseCSS = `
    html, body, h1, h2, h3, h4, h5, h6, p, ul, li, input, button, textarea, section {
        margin: 0;
        padding: 0;
    }

    html, body {
        -webkit-user-select: none;
        user-select: none;
        overflow-x: hidden;
    }

    html {
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
    }

    body {
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    body, input, button, textarea {
        border: none;
        outline: none;
    }

    a, img {
        -webkit-touch-callout: none;
    }

    a {
        text-decoration: none;
        color: inherit;
        -webkit-user-modify: read-write-plaintext-only;
        -webkit-tap-highlight-color: transparent;
    }

    ul, ol, li {
        list-style: none;
    }

    img {
        max-width: 100%;
    }

    .none {
        display: none;
    }

    .hidden {
        visibility: hidden;
    }

    .clearfix {
        content: ' ';
        display: block;
        clear: both;
        overflow: hidden;
    }
`

export default function setupRoutes(router, app) {
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
                // console.log(err, redirectLocation, renderProps)
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
                                    <title>${pkg.name}</title>
                                    <style>${baseCSS}</style>
                                    <style data-aphrodite>${css.content}</style>
                                    <script>
                                        window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};
                                        window.INITIAL_STATE = ${JSON.stringify(initialState)};
                                    </script>
                                </head>
                                <body>
                                    <div class="root">${html}</div>
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

    return router
}
