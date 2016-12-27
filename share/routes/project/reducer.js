/*
* @Author: chemdemo
* @Date:   2016-12-11 21:21:49
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 21:18:58
*/

'use strict'

const initialState = {}

export default function projects(state = initialState, action) {
    console.log(`projects reducer type ${action.type} action `, action)
    // if('LOAD_PROJECT_SUCCESS' === action.type) return Object.assign({}, state, { projects: action.projects })
    if('list' in action) {
        // console.log('ddgdg', state, Object.assign({}, state, { projects: action.list }))
        return Object.assign({}, state, { projects: action.list })
    }


    return state
}
