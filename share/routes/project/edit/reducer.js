/*
* @Author: chemdemo
* @Date:   2016-12-11 21:21:49
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 21:07:19
*/

'use strict'

const initialState = {}

export default function project(state = initialState, action) {
    console.log(`project reducer type ${action.type} project `, action.info || 'null')
    // if('LOAD_PROJECT_SUCCESS' === action.type) return Object.assign({}, state, { project: action.project })
    if('info' in action) return Object.assign({}, state, { info: action.info })

    return state
}
