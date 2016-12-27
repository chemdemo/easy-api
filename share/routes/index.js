/*
* @Author: dmyang
* @Date:   2016-10-21 17:59:28
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 20:23:34
*/

'use strict'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

if(typeof window !== 'undefined') {
    require('antd/dist/antd.css')
    require('../scss/all.scss')
}

import Layout from '../components/Layout'
import Home from './home'

export default function createRoutes(store) {
    const root = {
        path: '/',
        component: Layout,
        getChildRoutes(location, cb) {
            require.ensure([], require => {
                cb(null, [
                    require('./account').default(store),
                    require('./project').default(store)
                ])
            })
        },
        indexRoute: {
            component: Home
        }
    }

    return root
}
