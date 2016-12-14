/*
* @Author: dmyang
* @Date:   2016-12-14 20:34:57
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-14 20:44:02
*/

'use strict'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { injectAsyncReducer } from '../../../store'

export default store => {
    return {
        path: 'edit/:projectId?',

        getComponent(location, cb) => {
            // project list
            require.ensure(['./container'], require => {
                let projectView = require('./container').default
                let reducer = require('./reducer').default

                injectAsyncReducer(store, 'project', reducer)

                cb(null, projectView)
            })
        }
    }
}
