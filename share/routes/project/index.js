/*
* @Author: chemdemo
* @Date:   2016-12-11 20:56:42
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-14 20:44:47
*/

'use strict'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { injectAsyncReducer } from '../../store'

export default store => {
    return {
        path: 'project',

        getChildRoutes(location, cb) {
            require.ensure([], require => {
                cb(null, require('./edit').default(store))
            })
        }

        getComponent(location, cb) => {
            // project list
            require.ensure([], require => {
                let projectListView = require('./container').default
                let reducer = require('./reducer').default

                injectAsyncReducer(store, 'projects', reducer)

                cb(null, projectListView)
            })
        }
    }
}
