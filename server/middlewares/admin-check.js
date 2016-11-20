/*
* @Author: dmyang
* @Date:   2016-05-13 11:44:17
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-17 10:45:41
*/

'use strict'

const conf = require('../config')

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
