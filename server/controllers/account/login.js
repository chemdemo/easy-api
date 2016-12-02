/*
* @Author: dmyang
* @Date:   2016-04-12 17:00:06
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-01 15:48:58
*/

'use strict';

// @see http://wiki.meizu.com/index.php?title=%E7%AE%A1%E6%8E%A7%E5%B9%B3%E5%8F%B0%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3
const LOGIN_URL = 'http://scorpio.meizu.com/platform/login_form'

const qs = require('querystring')
const cookie = require('cookie')

const request = require('../../lib/request')
const logger = require('../../helpers/logger').daily
const illegal = require('../../helpers/illegal')

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
