/*
 * @Author: dmyang
 * @Date:   2016-10-21 15:10:19
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-10-25 16:03:14
 */

'use strict'

// import 'babel-polyfill'
import { trigger } from 'redial'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import match from 'react-router/lib/match'
import browserHistory from 'react-router/lib/browserHistory'
import { Provider } from 'react-redux'
import { StyleSheet } from 'aphrodite'

import { configureStore } from '../share/store'
const initialState = window.INITIAL_STATE || {}
const store = configureStore(initialState)
const { dispatch } = store

const container = document.getElementById('root')

StyleSheet.rehydrate(window.renderedClassNames)

const render = () => {
    const { pathname, search, hash } = window.location
    const location = `${pathname}${search}${hash}`

    const createRoutes = require('../share/routes/root').default
    const routes = createRoutes(store)

    match({ routes, location }, () => {
        ReactDOM.render( < Provider store = { store } >
            < Router routes = { routes }
            history = { browserHistory }
            key = { Math.random() }
            /> < /Provider>,
            container
        )
    })

    return browserHistory.listen(location => {
        match({ routes, location }, (error, redirectLocation, renderProps) => {
            if (error) console.log(error)
            const { components } = renderProps

            const locals = {
                path: renderProps.location.pathname,
                query: renderProps.location.query,
                params: renderProps.params,

                // Allow lifecycle hooks to dispatch Redux actions:
                dispatch
            }

            if (window.INITIAL_STATE) delete window.INITIAL_STATE
            else trigger('fetch', components, locals)

            trigger('defer', components, locals)
        })
    })
}

const unsubscribeHistory = render()

if (module.hot) {
    module.hot.accept('../share/routes/root', () => {
        unsubscribeHistory()
        setTimeout(render)
    })
}
