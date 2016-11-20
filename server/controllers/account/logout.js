/*
* @Author: dmyang
* @Date:   2016-04-13 15:03:44
* @Last Modified by:   dmyang
* @Last Modified time: 2016-04-18 16:24:54
*/

'use strict';

const LOGIN_URL = 'http://scorpio.meizu.com/platform/logout'

module.exports = function*() {
    // this.session = null
    // clear cookie
    this.cookies.set('uid', '', {expires: new Date(1)})
    this.redirect('/account/login')
}
