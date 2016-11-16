/*
* @Author: dmyang
* @Date:   2016-04-12 16:40:10
* @Last Modified by:   dmyang
* @Last Modified time: 2016-09-27 14:33:58
*/

'use strict'

const illegal = require('../helpers/illegal')

module.exports = function*(next) {
    // let session = this.session
    let username = this.cookies.get('uid')
    let xhr = this.get('x-requested-with') === 'XMLHttpRequest'

    if(!username) {
        if(xhr) {
            this.status = 401
            this.body = {code: 401, message: 'Login failure'}
        } else {
            this.redirect('/account/login')
        }
    } else {
        if(illegal.uid(username)) {
            if(xhr) {
                this.status = 403
                this.body = {code: 403, message: 'username illegal'}
            } else {
                this.body = `username <b>${uid}</b> illegal, please clean cookies and retry`
            }
            return
        }

        yield next
    }
}
