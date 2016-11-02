/*
* @Author: dmyang
* @Date:   2016-11-02 16:55:15
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-02 19:14:49
*/

'use strict'

import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

class View extends Component {
    render() {
        return (
            <div className="app">
                <header>
                    <nav>
                        <a href="#">规则列表</a>
                    </nav>
                </header>
                {this.props.children}
                <footer>Copyright © 2016 chemdemo</footer>
            </div>
        )
    }
}

export default View
