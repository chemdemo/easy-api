/*
* @Author: dmyang
* @Date:   2016-04-13 10:53:51
* @Last Modified by:   dmyang
* @Last Modified time: 2016-06-29 16:47:32
*/

'use strict';

const qs = require('querystring')
const crypto = require('crypto')

exports.serialize = (u, params) => {
    return u += (~u.indexOf('?') ? '' : '?') + qs.stringify(params, null, null, {encodeURIComponent: (v) => {return v}})
}

exports.wait = (ms, fn) => {
    return () => {
        return new Promise((resolve) => setTimeout(fn || resolve, ms))
    }
}

// @see http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
exports.uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
        return v.toString(16)
    })
}

exports.md5 = (data, encoding) => {
    return crypto.createHash('md5').update(data).digest(encoding || 'hex')
}

exports.hmac = (secret, str) => {
    let h = crypto.createHmac('sha1', secret).update(str).digest('hex')
    return h
}

exports.unique = (arr) => {
    return arr.reduce((pre, cur) => {
        if (pre.indexOf(cur) < 0) pre.push(cur)
        return pre
    }, [])
}
