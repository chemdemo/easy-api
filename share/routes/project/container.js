/*
* @Author: chemdemo
* @Date:   2016-12-11 20:56:54
* @Last Modified by:   chemdemo
* @Last Modified time: 2016-12-11 21:54:17
*/

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import Table from 'antd/lib/table'
// import Icon from 'antd/lib/icon'

import Header from '../../components/Header'
import Content from '../../components/Content'

import { fetchProject } from './actions'

const redial = {
    fetch: ({ dispatch }) => dispatch(fetchProject())
}
const selectProject = state => state.project
const mapStateToProps = state => ({project: selectProject(state)})

class View extends Component {
    render() {
        console.log(this.props.project)
        return (
            <div>
                <Header />
                <Content>
                    <div>peoject列表</div>
                </Content>
            </div>
        )
    }
}

export default provideHooks(redial)(connect(mapStateToProps)(View))
