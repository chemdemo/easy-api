/*
* @Author: dmyang
* @Date:   2016-05-10 20:26:26
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:47:06
*/

'use strict'

const mysql = require('mysql')

const logger = require('./logger').mysql
const conf = require('../config')

const oKeys = Object.keys
const genWhere = exports.genWhere = (filter) => {
    return oKeys(filter).reduce((pre, cur) => {
        let v = filter[cur]

        if('id' === cur) v -= 0

        pre.push(`${cur}='${v}'`)

        return pre
    }, []).join(' AND ')
}

let pool

const connect = exports.connect = () => {
    logger.debug(`config with ${JSON.stringify(conf.mysql)}`)

    pool = mysql.createPool(conf.mysql)

    /*pool.connect((err) => {
        if(err) {
            setTimeout(connect, 2000)
            logger.error(err)
        } else {
            logger.info(`connect mysql success`)
        }
    })*/

    pool.on('error', (err) => {
        logger.error(err)

        if(err.code === 'PROTOCOL_CONNECTION_LOST') connect()
        else throw err
    })
}

const query = exports.query = (sql) => {
    if(!pool) connect()

    return new Promise((resolve, reject) => {
        logger.info(`execute: ${sql}`)
        pool.query(sql, (err, rows) => {
            if(err) reject(err)
            else resolve(rows)
        })
    })
}

const getConnection = exports.getConnection = () => {
    if(!pool) connect()

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) reject(err)
            else resolve(connection)
        })
    })
}

exports.insert = (table, data, returnSQL) => {
    let keys = oKeys(data)
    let values = keys.map((key) => `'${data[key]}'`)
    let sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${values.join(',')})`

    return returnSQL ? sql : query(sql)
}

exports.insertArr = (table, arr, returnSQL) => {
    let keys = []
    let values = []

    arr.forEach((data) => {
        if(!keys.length) keys = oKeys(data)

        let v = keys.map((key) => `'${data[key]}'`)

        values.push(`(${v})`)
    })

    let sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES ${values.join(',')}`

    return returnSQL ? sql : query(sql)
}

exports.find = (table, filter, fields, sort, limit, skip) => {
    filter = filter || {}
    fields = fields || []
    sort = sort || {}

    // select * from [table] order by [order] [desc|asc] LIMIT 5 OFFSET 0
    let where = genWhere(filter)
    let sql = `SELECT ${fields.join(',') || '*'} FROM ${table}`
    let order = oKeys(sort).reduce((pre, cur) => {
        pre.push(`${cur} ${sort[cur] > 0 ? 'ASC' : 'DESC'}`)
        return pre
    }, []).join(' ')

    if(where) sql += ` WHERE ${where}`
    if(order) sql += ` ORDER BY ${order}`
    if(limit > 0) sql += ` LIMIT ${limit}`
    if(skip > 0) sql += ` OFFSET ${skip}`

    return query(sql)
}

exports.findOne = (table, filter, fields) => {
    return new Promise((resolve, reject) => {
        exports.find(table, filter, fields, null, 1, 0)
            .then((rows) => {resolve(rows[0])})
            .catch(reject)
    })
}

exports.update = (table, filter, update, returnSQL) => {
    // Update [table] set key1=value1 [, key2 =value2 , ...] [where id=id_num] [order by 字段 顺序]
    let set = oKeys(update).reduce((pre, cur) => {
        pre.push(`${cur}='${update[cur]}'`)
        return pre
    }, []).join(',')
    let where = genWhere(filter)
    let sql = `UPDATE ${table} SET ${set} WHERE ${where}`

    return returnSQL ? sql : query(sql)
}

exports.delete = (table, filter, returnSQL) => {
    // DELETE FROM [table] WHERE [LastName = 'Wilson']
    let where = genWhere(filter)
    let sql = `DELETE FROM ${table} WHERE ${where}`

    return returnSQL ? sql : query(sql)
}

// @see http://stackoverflow.com/questions/24980509/transactions-in-nodejs
// 并行执行sql事务
exports.parallelTransaction = (sqlArr) => {
    let self = this

    return new Promise((resolve, reject) => {
        getConnection().then((conn) => {
            logger.info(`begin transaction with sql:\n ${sqlArr.join('\n')}`)
            conn.beginTransaction((err) => {
                if(err) logger.error('transaction error', err)
                if(err) return reject(err)

                let queue = []

                sqlArr.forEach((sql) => {
                    queue.push(new Promise((_resolve, _reject) => {
                        conn.query(sql, (err, result) => {
                            if(err) logger.error(`execute transaction sql ${sql} error`, err)
                            if(err) conn.rollback(() => _reject(err))
                            else _resolve(true)
                        })
                    }))
                })

                Promise.all(queue).then(() => {
                    conn.commit((err) => {
                        conn.release()
                        if(err) logger.error('commit transaction error', err)
                        if(err) reject(err)
                        else resolve(true)
                    })
                }, reject)
            })
        }).catch(reject)
    })
}
