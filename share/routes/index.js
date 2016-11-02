/*
* @Author: dmyang
* @Date:   2016-10-21 17:59:28
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-02 16:09:04
*/

'use strict'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/App'
import Home from './home'

export default function createRoutes(store) {
    const root = {
        path: '/',
        component: App,
        getChildRoutes: (location, cb) => {
            require.ensure([], require => {
                // cb(null, [require('./CreateRule').default(store)])
                cb(null, [])
            })
        },
        indexRoute: {
            component: Home
        }
    }

    return root
}
