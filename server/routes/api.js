/*
* @Author: dmyang
* @Date:   2016-11-04 21:26:33
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-04 21:27:39
*/

'use strict'

export default function setupRoutes(router, app) {
    router.get('/api/test', function*() {
        this.body = {code: 200, result: 'test text'}
    })
}
