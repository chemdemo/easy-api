/*
* @Author: dmyang
* @Date:   2016-11-04 21:26:33
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 20:41:24
*/

'use strict'

const bodyParse = require('koa-body')()

const loginCtrl = require('../controllers/account')

export default function setupRoutes(router, app) {
    router.post('/api/account/login', bodyParse, loginCtrl.login)

    router.get('/api/account/login', function*() {
    	this.body = {code: 200, result: {name: 'guest'}}
    })

    router.get('/api/project/list', function*() {
        this.body = {code: 200, result: []}
    })

    router.get('/api/project/get-conf', function*() {
        this.body = {code: 200, result: {name: 'test', owner: 'guest', members: ['guest2']}}
    })
}
