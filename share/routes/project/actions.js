/*
* @Author: chemdemo
* @Date:   2016-12-11 21:22:33
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 21:16:30
*/

'use strict'

const FETCH_PROJECTS_URI = 'http://localhost:4000/api/project/list'

export function fetchProjects() {
    return (dispatch, getState, { axios }) => {
        const { protocol, host } = getState().sourceRequest

        dispatch({ type: 'LOAD_PROJECTS_REQUEST' })

        return axios.get(FETCH_PROJECTS_URI)
            .then(res => {
                dispatch({
                    type: 'LOAD_PROJECTS_SUCCESS',
                    list: res.data.result
                })
            })
            .catch(error => {
                console.error(`Error in reducer that handles LOAD_PROJECT_FAILURE: `, error)
                dispatch({
                    type: 'LOAD_PROJECTS_FAILURE',
                    list: []
                })
            })
    }
}
