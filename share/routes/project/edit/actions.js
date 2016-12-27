/*
* @Author: chemdemo
* @Date:   2016-12-11 21:22:33
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 21:06:54
*/

'use strict'

const FETCH_PROJECT_URI = 'http://localhost:4000/api/project/get-conf'

export function fetchProject() {
    return (dispatch, getState, { axios }) => {
        const { protocol, host } = getState().sourceRequest

        dispatch({ type: 'LOAD_PROJECT_REQUEST' })

        return axios.get(FETCH_PROJECT_URI)
            .then(res => {
                dispatch({
                    type: 'LOAD_PROJECT_SUCCESS',
                    info: res.data.result
                })
            })
            .catch(error => {
                console.error(`Error in reducer that handles LOAD_PROJECT_FAILURE: `, error)
                dispatch({
                    type: 'LOAD_PROJECT_FAILURE',
                    info: {}
                })
            })
    }
}
