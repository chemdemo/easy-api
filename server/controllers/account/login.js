/*
* @Author: dmyang
* @Date:   2016-04-12 17:00:06
* @Last Modified by:   chemdemo
* @Last Modified time: 2016-12-11 21:27:02
*/

'use strict'

const qs = require('querystring')
const cookie = require('cookie')

const logger = require('../../helpers/logger').daily

// 根据实际需求定制login逻辑
module.exports = function* () {
    let body = this.request.body

    const conf = require('../../config').admin

    if(body.username && conf.split(':')[0] === body.username) {
        yield this.body = {code: 200, username: body.username}
        return
    }

    this.status = 500
    this.body = 'login fail'
}
