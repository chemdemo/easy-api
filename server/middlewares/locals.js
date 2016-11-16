/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:19:37
*/

'use strict'

// add locals support
module.exports = (locals) => {
    return function* (next) {
        this._initState = locals

        yield next
    }
}
