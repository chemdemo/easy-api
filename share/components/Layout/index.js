/*
* @Author: dmyang
* @Date:   2016-11-02 16:55:15
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-02 16:49:44
*/

'use strict'

import React, { Component } from 'react'
// import { StyleSheet, css } from 'aphrodite'

/*if(typeof window !== 'undefined') {
	require('../../scss/base.scss')
	require('antd/dist/antd.css')
}*/

class Layout extends Component {
    render() {
        return (
            <div className="react-app">
                {this.props.children}
                <footer>Copyright © 2016 chemdemo</footer>
            </div>
        )
    }
}

export default Layout
