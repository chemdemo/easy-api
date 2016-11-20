/*
* @Author: dmyang
* @Date:   2016-11-17 11:38:51
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-20 00:31:10
*/

'use strict'

const initialState = {
    name: 'guest'
}

export default function account(state = initialState, action) {
    if('name' in action) return Object.assign({}, state, { name: action.name })

    return state
}

// { name: xxx }
export const selectAccount = state => state.account
