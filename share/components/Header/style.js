/*
* @Author: yangdemo
* @Date:   2016-12-01 18:02:56
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-02 17:03:12
*/

'use strict'

import { StyleSheet } from '../../module/global-style'

const styles = StyleSheet.create({
    header: {
        padding: '0 5rem',
        'border-bottom': '1px solid #DDD'
    },
    title: {
        float: 'left',
        'margin-top': '5px',
        color: '#6f6f6f',
        'margin-right': '20px'
    },
    menu: {
        'border-bottom': 'none',
        'background-color': 'transparent',
    },
    account: {
        float: 'right',
        'margin-top': '12px'
    },
    'user-name': {
        'margin-top': '10px'
    }
})

export default styles
