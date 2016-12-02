/*
* @Author: dmyang
* @Date:   2016-11-04 21:26:33
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-01 15:40:09
*/

'use strict'

const bodyParse = require('koa-body')()

const loginCtrl = require('../controllers/account')

export default function setupRoutes(router, app) {
    router.post('/api/account/login', bodyParse, loginCtrl.login)

    router.get('/api/account/login', function*() {
    	this.body = {code: 200, account: {name: 'guest'}}
    })
}
