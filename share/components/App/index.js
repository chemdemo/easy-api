/*
* @Author: dmyang
* @Date:   2016-11-02 16:55:15
* @Last Modified by:   chemdemo
* @Last Modified time: 2016-11-23 00:52:20
*/

'use strict'

import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

if(typeof window !== 'undefined') {
	require('../../scss/base.scss')
	require('antd/dist/antd.css')
}

class View extends Component {
    render() {
        return (
            <div className="app">
                {this.props.children}
                <footer>Copyright © 2016 chemdemo</footer>
            </div>
        )
    }
}

export default View
