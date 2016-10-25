/*
* @Author: dmyang
* @Date:   2016-10-21 17:59:28
* @Last Modified by:   dmyang
* @Last Modified time: 2016-10-25 19:21:22
*/

'use strict'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function createRoutes(store) {
    const root = {
        path: '/',
        component: Home,
        getChildRoutes: (location, cb) => {
            require.ensure([], require => {
                cb(null, [require('./CreateRule').default(store)])
            })
        },
        indexRoute: {
            component: Home
        }
    }
}
