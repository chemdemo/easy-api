/*
* @Author: dmyang
* @Date:   2016-11-04 21:26:33
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 16:09:20
*/

'use strict'

export default function setupRoutes(router, app) {
    router.get('/api/test', function*() {
        this.body = {code: 200, result: 'test text'}
    })

    router.get('/api/account/login', function*() {
    	this.body = {code: 200, account: {name: 'guest'}}
    })
}
