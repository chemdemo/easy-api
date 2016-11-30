/*
* @Author: yangdemo
* @Date:   2016-11-30 15:24:11
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-30 15:41:08
*/

'use strict'

const MongoClient = require('mongodb').MongoClient
const logger = require('./logger').mongodb
const conf = require('../config').mongodb

const collUri = `mongodb://${conf.host}:${conf.port}/${conf.db}`
const collOption = {
    db: {
        native_parser: false
    },
    server: {
        socketOptions: {
            connectTimeoutMS: 500
        }
    }
}

exports.connect = () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(collUri, collOption, (err, db) => {
			if(err) {
				logger.error(err)
				reject(err)
				return
			}

			resolve(db)
		})
	})
}