/*
* @Author: dmyang
* @Date:   2016-11-17 11:20:59
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 16:33:08
*/

'use strict'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { injectAsyncReducer } from '../../store'

export default store => {
    // if(typeof window !== 'undefined') require('../../scss/account.scss')

    return {
        path: 'account/login',
        getComponents: (location, cb) => {
            // console.log('state', store.getState())
            // console.log(location)
            require.ensure(['./container'], require => {
                let loginView = require('./container').default
                let loginReducer = require('./reducer').default

                // loginReducer的导出函数必须是account，或者{account: function}
                // injectAsyncReducer即动态插入state key的reducer
                injectAsyncReducer(store, 'account', loginReducer)

                // @see https://github.com/jaredpalmer/react-production-starter/issues/34
                // if(typeof window !== 'undefined') require('../../scss/account.scss')

                cb(null, loginView)
            })
        }
    }
}
