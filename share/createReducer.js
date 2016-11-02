/*
 * @Author: dmyang
 * @Date:   2016-10-21 17:59:28
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-11-02 11:11:35
 */

'use strict'

import { combineReducers } from 'redux'
const initialState = {
    host: '',
    protocol: ''
}

const sourceRequest = (state = initialState, action) => state

// Only combine reducers needed for initial render, others will be added async
export default function createReducer(asyncReducers) {
    return combineReducers({
        sourceRequest,
        ...asyncReducers
    })
}
