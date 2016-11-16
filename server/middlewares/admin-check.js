/*
* @Author: dmyang
* @Date:   2016-05-13 11:44:17
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:43:57
*/

'use strict'

const conf = require('../config')

const TABLE = 'accounts'

module.exports = function*(next) {
    let username = this.cookies.get('uid')
    let xhr = this.get('x-requested-with') === 'XMLHttpRequest'

    if(!!~conf.admin.indexOf(username)) {
        yield next
    } else {
        this.status = 403
        if(xhr) this.body = {code: 403, message: 'Forbidden'}
        else this.body = 'Forbidden'
    }
}
