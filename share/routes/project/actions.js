/*
* @Author: chemdemo
* @Date:   2016-12-11 21:22:33
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-14 20:39:01
*/

'use strict'

const FETCH_PROJECT_URI = 'http://localhost:4000/api/project/list'

export function fetchProjects() {
    return (dispatch, getState, { axios }) => {
        const { protocol, host } = getState().sourceRequest

        dispatch({ type: LOAD_PROJECT_REQUEST })

        return axios.get(FETCH_PROJECT_URI)
            .then(res => {
                dispatch({
                    type: 'LOAD_PROJECT_SUCCESS',
                    project: res.data.result
                })
            })
            .catch(error => {
                console.error(`Error in reducer that handles LOAD_PROJECT_FAILURE: `, error)
                dispatch({
                    type: LOAD_PROJECT_FAILURE,
                    project: {}
                })
            })
    }
}
