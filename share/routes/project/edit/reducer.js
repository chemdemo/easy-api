/*
* @Author: chemdemo
* @Date:   2016-12-11 21:21:49
* @Last Modified by:   chemdemo
* @Last Modified time: 2016-12-11 21:53:06
*/

'use strict'

const initialState = {}

export default function project(state = initialState, action) {
    console.log(`project reducer type ${action.type} project `, action.project || 'null')
    // if('LOAD_PROJECT_SUCCESS' === action.type) return Object.assign({}, state, { project: action.project })
    if('project' in action) return Object.assign({}, state, { project: action.project })

    return state
}
