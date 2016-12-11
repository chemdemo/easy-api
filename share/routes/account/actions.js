/*
 * @Author: dmyang
 * @Date:   2016-11-19 22:57:37
 * @Last Modified by:   chemdemo
 * @Last Modified time: 2016-12-11 21:29:43
 */

'use strict'

const LOGIN_URI = 'http://localhost:4000/api/account/login'

import { LOAD_ACCOUNT_REQUEST, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE } from '../../constants'

export function login() {
    return (dispatch, getState, { axios }) => {
        const { protocol, host } = getState().sourceRequest

        dispatch({ type: LOAD_ACCOUNT_REQUEST })

        return axios.get(LOGIN_URI)
            .then(res => {
                dispatch({
                    type: LOAD_ACCOUNT_SUCCESS,
                    name: res.data.result.name
                })
            })
            .catch(error => {
                console.error(`Error in reducer that handles ${LOAD_ACCOUNT_FAILURE}: `, error)
                dispatch({
                    type: LOAD_ACCOUNT_FAILURE,
                    name: 'unlogin'
                })
            })
    }
}
