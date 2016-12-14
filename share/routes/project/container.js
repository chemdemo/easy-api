/*
* @Author: chemdemo
* @Date:   2016-12-11 20:56:54
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-14 20:42:32
*/

'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import Table from 'antd/lib/table'
// import Icon from 'antd/lib/icon'

import Header from '../../components/Header'
import Content from '../../components/Content'

import { fetchProjects } from './actions'

const redial = {
    fetch: ({ dispatch }) => dispatch(fetchProjects())
}
const selectProjects = state => state.projects
const mapStateToProps = state => ({projects: selectProjects(state)})

class View extends Component {
    render() {
        console.log(this.props.project)
        return (
            <div>
                <Header />
                <Content>
                    <div>project列表</div>
                </Content>
            </div>
        )
    }
}

export default provideHooks(redial)(connect(mapStateToProps)(View))
