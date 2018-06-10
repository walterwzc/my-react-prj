import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values)
            }
        })

        fetch('/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.form.getFieldsValue())
        })
            .then(response => response.json())
            .then(result => {
                if (result.data.success) {
                    this.props.history.push('/form');
                }
            })
    }


    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon type="user" style={{ fontSize: 13 }} />
                            }
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon type="lock" style={{ fontSize: 13 }} />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    Or <a>register now!</a>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(LoginForm)

