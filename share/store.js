/*
 * @Author: dmyang
 * @Date:   2016-10-21 17:59:28
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-10-21 18:02:26
 */

'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import createReducer from './createReducer'

export function configureStore(initialState) {
    let store = createStore(createReducer(), initialState, compose(
        applyMiddleware(
            thunk.withExtraArgument({ axios })
        ),

        process.env.NODE_ENV === 'development' &&
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ))

    store.asyncReducers = {}

    if (process.env.NODE_ENV === 'development') {
        if (module.hot) {
            module.hot.accept('./createReducer', () => store.replaceReducer(require('./createReducer').default))
        }
    }

    return store
}

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
}
