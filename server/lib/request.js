/**
* @Author: dmyang
* @Date:   2016-04-13 10:49:34
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-17 10:41:35
*/

'use strict';

const http = require('http')
const url = require('url')

const _ = require('lodash')
const cookie = require('cookie')

/**
 * HTTP request client
 * @param {String} u        url
 * @param {Object} data     [{} | null], if data is not empty, request method will be GET, else POST
 * @param {Object} headers  request headers
 */
const request = (u, data, headers) => {
    // let parsed = url.parse(u, null, null, {decodeURIComponent: decodeURIComponent})
    let parsed = url.parse(u)
    let method = !!data ? 'POST' : 'GET'
    let options = {
        method: method,
        hostname: parsed.hostname,
        path: parsed.path
    }

    if('POST' === method) headers = _.assign(headers || {}, {'Content-Length': data.length})

    if(headers) options.headers = headers

    return new Promise((resolve, reject) => {
        let req = (/^https/.test(u) ? https : http).request(options, (res) => {
            let cookies = res.headers['set-cookie'] || []

            let chunks = []

            res.on('data', chunk => chunks.push(chunk))

            res.on('end', () => {
                let buf = Buffer.concat(chunks)
                let result = {
                    body: buf.toString(),
                    cookies: cookies
                }

                resolve(result)
            })

            res.on('error', reject)
        })

        // req.setTimeout(5000, () => reject(`request ${u} timeout`))

        req.on('error', reject)

        if('POST' === method) req.write(data)

        req.end()
    })
}

module.exports = request
