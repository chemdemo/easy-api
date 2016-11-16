/*
* @Author: dmyang
* @Date:   2016-10-11 17:56:02
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:18:34
*/

'use strict'

const logger = require('../helpers/logger').daily

module.exports = function* (next) {
    let t = Date.now()

    yield next

    t = Date.now() - t

    logger.info(`${this.method} ${this.url} - ${t}ms`)

    this.set('X-Response-Time', t + 'ms')
}
