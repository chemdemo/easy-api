/*
* @Author: dmyang
* @Date:   2016-11-17 11:20:59
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-20 00:55:59
*/

'use strict'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { injectAsyncReducer } from '../../store'

export default store => {
    return {
        path: 'account/login',
        getComponents: (location, cb) => {
            require.ensure(['./container'], require => {
                let loginView = require('./container').default
                let loginReducer = require('./reducer').default

                // loginReducer的导出函数必须是account，或者{account: function}
                // injectAsyncReducer即动态插入state key的reducer
                injectAsyncReducer(store, 'account', loginReducer)

                cb(null, loginView)
            })
        }
    }
}