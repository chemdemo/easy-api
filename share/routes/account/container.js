/*
* @Author: dmyang
* @Date:   2016-11-17 11:37:04
* @Last Modified by:   chemdemo
* @Last Modified time: 2016-12-11 20:40:00
*/

'use strict'

import { provideHooks } from 'redial'
import React, { Component } from 'react'
import { connect } from 'react-redux'
// also see https://github.com/visionmedia/superagent
import reqwest from 'reqwest'
// import { StyleSheet, css } from 'aphrodite/no-important'
import { css, cssGlobal } from '../../module/global-style'

// 按需加载
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
// import { Form, Input, Button, Checkbox, Row, Col } from 'antd'

import { login } from './actions'
import { selectAccount } from './reducer'

import styles from './styles'

const FormItem = Form.Item

const redial = {
    fetch: ({ dispatch }) => dispatch(login())
}

const mapStateToProps = state => ({account: selectAccount(state)})

const LOGIN_URI = '/api/account/login'

message.config({
    top: 600
})

class View extends Component {
    handleSubmit(e) {
        e.preventDefault()

        let self = this

        this.props.form.validateFields((errors, values) => {
            if(!!errors) return console.error(errors)

            let fields = self.props.form.getFieldsValue()

            reqwest({
                url: LOGIN_URI,
                method: 'post',
                data: {
                    username: fields.username,
                    password: fields.password
                },
                error: function(err) {
                    console.error(err)
                    if(err.message) message.error(err.message)
                },
                success: function(r) {
                    if(r.code === 200) location.href = '/' + location.hash
                    else message.warning(r.message)
                }
            })
        })
    }

    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form

        if(isFieldValidating(field)) return 'validating'
        else if(!!getFieldError(field)) return 'error'
        else if(getFieldValue(field)) return 'success'
    }

    nameCheck(rule, value, callback) {
        if(/[^a-z0-9]/.test(value)) callback('用户名称不能含特殊字符')
        else callback()
    }

    render() {
        const name = this.props.account.name || 'guest'
        const { getFieldDecorator } = this.props.form
        const accountProps = getFieldDecorator('username', {
            rules: [
                { required: true, message: '请输入OA账号' },
                { validator: this.nameCheck }
            ],
        })
        const pswdProps = getFieldDecorator('password', {
            rules: [
                { required: true, message: '密码不能为空' }
            ],
        })
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 15 },
        }

        return (
            <Form horizontal className={css(styles.form)}>
                <FormItem label="账户：" hasFeedback {...formItemLayout}>
                    <Input placeholder="请输入OA账号" defaultValue={ name }
                        addonAfter="@xx.com"
                        {...accountProps}
                    />
                </FormItem>
                <FormItem label="密码：" hasFeedback {...formItemLayout}>
                    <Input type="password"
                        placeholder="请输入密码"
                        {...pswdProps}
                    />
                </FormItem>
                <FormItem wrapperCol = {{ span: 15, offset: 3 } }>
                    <Button type="primary" htmlType="submit" size="large" onClick = { this.handleSubmit.bind(this) }>登录</Button>
                </FormItem>
            </Form>
        )
    }

    componentWillMount() {
        cssGlobal(styles.globals)
    }
}

View = Form.create()(View)

export default provideHooks(redial)(connect(mapStateToProps)(View))
