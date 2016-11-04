/*
* @Author: dmyang
* @Date:   2016-11-03 11:15:31
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-04 23:50:11
*/

'use strict'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { StyleSheetServer } from 'aphrodite'

import { compileDev } from '../../tools/dx'
import { configureStore } from '../../share/store'
// import reducer from '../../share/createReducer'
import createRoutes from '../../share/routes'

const pkg = require('../../package.json')

const promiseMatch = (location) => {
    return new Promise((resolve, reject) => {
        match(location, (err, redirectLocation, renderProps) => {
            if(err) return reject({ err })
            if(redirectLocation) return resolve({ redirectLocation })
            if(renderProps) return resolve({ renderProps })
            reject()
        })
    })
}

let assets

export default function setupRoutes(router, app) {
    router.get('*', function*(next) {
        const store = configureStore({
            sourceRequest: {
                protocol: this.headers['x-forwarded-proto'] || this.protocol,
                host: this.headers.host
            }
        })
        const routes = createRoutes(store)
        const history = createMemoryHistory(this.url)
        const { dispatch } = store

        if(global.__PROD__) assets = require('../../public/assets/assets.json')

        try {
            const r = yield promiseMatch({ routes, history })

            if('redirectLocation' in r) {
                this.redirect(r.redirectLocation.pathname + r.redirectLocation.search, '/')
                return
            }

            const { components } = r.renderProps
            const locals = {
                path: r.renderProps.location.pathname,
                query: r.renderProps.location.query,
                params: r.renderProps.params,
                dispatch
            }

            yield trigger('fetch', components, locals)

            const initialState = store.getState()
            const InitialView = (
                <Provider store={store}>
                    <RouterContext {...r.renderProps} />
                </Provider>
            )
            const { html, css} = StyleSheetServer.renderStatic(() => ReactDOMServer.renderToString(InitialView))
            const includeScript = `
                window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};
                window.INITIAL_STATE = ${JSON.stringify(initialState)}
            `
            const scripts = [__PROD__ ? assets.vendor.js : '/vendor.js', __PROD__ ? assets.main.js : '/main.js']

            yield this.render('index', {
                title: pkg.name,
                html,
                aphroditeCSS: css.content,
                includeScript,
                scripts
            })
        } catch(e) {
            console.error(e || 'Server intenal error')
            this.status = 500
            this.body = e ? e.stack : 'Server intenal error'
        }
    })

    return router
}
