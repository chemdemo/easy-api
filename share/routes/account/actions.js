/*
 * @Author: dmyang
 * @Date:   2016-11-19 22:57:37
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-11-20 00:16:55
 */

'use strict'

const LOGIN_URI = '/api/account/login'

import { LOAD_ACCOUNT_REQUEST, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE } from '../../constants'

export function login() {
    return (dispatch, getState, { axios }) => {
        const { protocol, host } = getState().sourceRequest

        dispatch({ type: LOAD_ACCOUNT_REQUEST })

        return axios.get(LOGIN_URI)
            .then(res => {
                dispatch({
                    type: LOAD_ACCOUNT_SUCCESS,
                    name: 'dmyang'
                })
            })
            .catch(error => {
                console.error(`Error in reducer that handles ${LOAD_ACCOUNT_FAILURE}: `, error)
                dispatch({
                    type: LOAD_ACCOUNT_FAILURE,
                    name: 'dmyang-err'
                })
            })
    }
}
