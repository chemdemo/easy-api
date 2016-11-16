/*
* @Author: dmyang
* @Date:   2016-09-27 11:38:52
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:46:47
*/

'use strict';

exports.uid = uid => /[^a-z0-9]/.test(uid)

exports.id = id => /\D/.test(id)

exports.name = name => name && /[^\u4E00-\u9FA5\uF900-\uFA2Da-z0-9\_\-]/i.test(name)

exports.author = exports.uid
