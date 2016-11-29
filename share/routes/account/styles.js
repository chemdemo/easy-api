/*
* @Author: dmyang
* @Date:   2016-11-23 17:33:09
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 20:29:35
*/

'use strict'

// import { StyleSheet } from 'aphrodite/no-important'
import { StyleSheet } from '../../module/global-style'

const styles = StyleSheet.create({
    globals: {
        '*body': {'background-color': '#EFF5F9'},
        '*h1,h2,h3': {'margin': 0}
    },
    form: {
        width: '35rem',
        margin: '20rem auto'
    }
})

export default styles
