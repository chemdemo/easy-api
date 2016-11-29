/*
* @Author: yangdemo
* @Date:   2016-11-29 20:09:31
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 20:24:59
*/

'use strict'

const gulp = require('gulp')
const webpack = require('webpack')

const gutil = require('gulp-util')

const assets = process.cwd() + '/public/assets'
const build = process.cwd() + '/build'

// clean assets
gulp.task('clean', () => {
    const clean = require('gulp-clean')

    return gulp.src([assets, build], {read: true}).pipe(clean())
})