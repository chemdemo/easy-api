/*
* @Author: dmyang
* @Date:   2016-10-21 17:59:28
* @Last Modified by:   dmyang
* @Last Modified time: 2016-10-21 18:00:50
*/

'use strict'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function createRoutes(store) {
    ;
}
