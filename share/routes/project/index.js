/*
* @Author: chemdemo
* @Date:   2016-12-11 20:56:42
* @Last Modified by:   chemdemo
* @Last Modified time: 2016-12-11 21:55:13
*/

'use strict'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { injectAsyncReducer } from '../../store'

// project/list
// project/:projectId
export default store => {
    return {
        path: 'project/edit',
        getComponents: (location, cb) => {
            require.ensure(['./container'], require => {
                let projectView = require('./container').default
                let reducer = require('./reducer').default

                injectAsyncReducer(store, 'project', reducer)

                cb(null, projectView)
            })
        }
    }
}
