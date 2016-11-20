/*
* @Author: dmyang
* @Date:   2016-04-12 17:00:06
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-17 10:44:17
*/

'use strict';

// @see http://wiki.meizu.com/index.php?title=%E7%AE%A1%E6%8E%A7%E5%B9%B3%E5%8F%B0%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3
const LOGIN_URL = 'http://scorpio.meizu.com/platform/login_form'

const qs = require('querystring')
const cookie = require('cookie')

const request = require('../../lib/request')
const logger = require('../../helpers/logger').daily
const illegal = require('../../helpers/illegal')

module.exports = function* () {
    let headers = this.request.headers
    let body = this.request.body
    let _headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    let data = {}
    let now = Date.now()

    // logger.info(`session`, this.session)

    try {
        var lastLoginTime = this.session.lastLoginTime || 0
        var loginCount = this.session.loginCount || 0

        this.session.lastLoginTime = now
        this.session.loginCount = loginCount + 1
    } catch(e) {
        logger.error(e)
        this.status = 500
        this.body = e
        return
    }
    // 30s内重复登录10次以上，限制下时间不让登录
    if(loginCount > 10 && now - lastLoginTime < 30*1000) {
        this.body = {code: 2, message: '登录过于频繁，请稍后再试'}
        return
    }

    if(!body.username) {
        this.body = {code: 1, message: 'field `username` required'}
        return
    }

    if(illegal.uid(body.username)) {
        this.body = {code: 2, message: 'field `username` illegal'}
        return
    }

    if(!body.password) {
        this.body = {code: 1, message: 'field `password` required'}
        return
    }

    if(headers['cookie']) _headers['Cookie'] = headers['cookie']

    data['username'] = body.username.trim()
    data['password'] = body.password.trim()

    try {
        let result = yield request(LOGIN_URL, qs.stringify(data), _headers)
        let cookies = cookie.parse(result.cookies.join(';'))
        let _body = JSON.parse(result.body)

        if(_body.code == 200) {
            let d = new Date()
            let cookieDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3)

            for(let k in cookies) this.cookies.set(k, cookies[k])
            this.cookies.set('uid', data.username, {expires: cookieDate})
            this.session.loginCount = 1
            // this.session.token = `@token:${data.username}:${Date.now()}`
        } else {
            // this.session.token = null
            this.cookies.set('uid', '', {expires: new Date(1)})
        }

        this.body = _body
    } catch(e) {
        logger.error(e)
        // this.session.token = null
        this.cookies.set('uid', '', {expires: new Date(1)})
        this.status = 500
        this.body = e
    }
}
