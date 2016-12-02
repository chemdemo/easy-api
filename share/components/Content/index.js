/*
* @Author: yangdemo
* @Date:   2016-12-02 16:17:43
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-02 16:19:41
*/

'use strict'

import React, { Component } from 'react'

import { css } from '../../module/global-style'

import styles from './style'

class Content extends Component {
    render() {
        return (
            <section className={css(styles.content)}>
                {this.props.children}
            </section>
        )
    }
}

export default Content
