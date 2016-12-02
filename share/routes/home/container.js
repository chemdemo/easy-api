/*
* @Author: yangdemo
* @Date:   2016-12-02 17:55:38
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-12-02 18:05:59
*/

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Table from 'antd/lib/table'
import Icon from 'antd/lib/icon'

import Header from '../../components/Header'
import Content from '../../components/Content'


class View extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content>
                    <div>接口列表</div>
                </Content>
            </div>
        )
    }
}

export default View
