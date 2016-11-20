/*
 * @Author: dmyang
 * @Date:   2016-10-21 17:59:28
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-11-20 00:53:39
 */

'use strict'

import { combineReducers } from 'redux'
const initialState = {
    host: '',
    protocol: ''
}

// sourceRequest在configureStore（server/routes/page.js）赋值
const sourceRequest = (state = initialState, action) => state

// Only combine reducers needed for initial render, others will be added async
export default function createReducer(asyncReducers) {
    if(!asyncReducers) return sourceRequest

    // 注意！！combineReducers参数格式：{key1: value1, key2, value2 [, ...]}，即其键值对为 [state key]: [function reducer]
    // asyncReducers格式： {state newStateKey: [function newReducer]}
    return combineReducers({
        sourceRequest,
        ...asyncReducers
    })
}
