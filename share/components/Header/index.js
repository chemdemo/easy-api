/*
* @Author: yangdemo
* @Date:   2016-12-01 17:52:44
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-27 20:38:13
*/

'use strict'

import React, { Component } from 'react'
import Menu from 'antd/lib/menu'
import Modal from 'antd/lib/modal'
import Dropdown from 'antd/lib/dropdown'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { Link } from 'react-router'

import { css } from '../../module/global-style'

import styles from './style'

class Header extends Component {
    saveAvatar() {}

    hideUploadBox() {}

    render() {
        const userName = this.props.username || 'guest'
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <a href="javascript:void(0)" onClick={this.showUploadBox}>修改头像</a>
                </Menu.Item>
                <Menu.Item key="2"><a href="/account/logout">退出</a></Menu.Item>
            </Menu>
        )

        return (
            <header>
                <h1 className={css(styles.title)}><Link to="/">Easy API</Link></h1>
                <div className={css(styles.account)}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="javascript:void(0)">
                            <span className={css(styles['user-name'])}>{userName} </span>
                            <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <Menu mode="horizontal" className={css(styles.menu)}>
                    <Menu.Item key="create-proj">
                        <Link to="/project">新建项目</Link>
                    </Menu.Item>
                    <Menu.Item key="create-api">
                        <Link to="/api">新建接口</Link>
                    </Menu.Item>
                </Menu>
            </header>
        )
    }
}

export default Header
