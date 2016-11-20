/*
 * @Author: dmyang
 * @Date:   2016-10-21 15:10:19
 * @Last Modified by:   chemdemo
 * @Last Modified time: 2016-11-20 17:40:27
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
import createRoutes from '../share/routes'

const initialState = window.INITIAL_STATE || {}
const store = configureStore(initialState)
const { dispatch } = store

StyleSheet.rehydrate(window.renderedClassNames)

import 'antd/dist/antd.css'
// require('../scss/account.scss')

const render = () => {
    const { pathname, search, hash } = window.location
    const location = `${pathname}${search}${hash}`
    const routes = createRoutes(store)

    const container = document.getElementById('root')

    match({ routes, location }, () => {
        ReactDOM.render(
            <Provider store = { store }>
                <Router routes = { routes } history = { browserHistory } key = { Math.random() }/>
            </Provider>,
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

            console.info('INITIAL_STATE', INITIAL_STATE)

            if (window.INITIAL_STATE) delete window.INITIAL_STATE
            else trigger('fetch', components, locals)

            trigger('defer', components, locals)
        })
    })
}

const unsubscribeHistory = render()

if (module.hot) {
    module.hot.accept('../share/routes', () => {
        unsubscribeHistory()
        setTimeout(render)
    })
}
