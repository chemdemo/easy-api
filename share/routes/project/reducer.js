/*
* @Author: chemdemo
* @Date:   2016-12-11 21:21:49
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-14 20:40:14
*/

'use strict'

const initialState = {}

export default function projects(state = initialState, action) {
    console.log(`projects reducer type ${action.type} projects `, action.projects || 'null')
    // if('LOAD_PROJECT_SUCCESS' === action.type) return Object.assign({}, state, { projects: action.projects })
    if('projects' in action) return Object.assign({}, state, { projects: action.projects })

    return state
}
