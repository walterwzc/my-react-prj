import React, { Component } from 'react'
import { Form, Input, Button, Radio, Upload, Icon, message } from 'antd'

const fs = require('fs');

const FormItem = Form.Item

class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: '',
            companyLogo: {},
            positionName: '',
            positionSalary: ''
        }
    }

    handleChangeCompanyName(e) {
        this.setState({
            companyName: e.target.value
        })
    }

    handleChangePositionName(e) {
        this.setState({
            positionName: e.target.value
        })
    }

    handleChangepositionSalary(e) {
        this.setState({
            positionSalary: e.target.value
        })
    }

    addFormSubmit() {
        const formData = {
            companyName: this.state.companyName,
            companyLogo: this.state.companyLogo,
            positionName: this.state.positionName,
            positionSalary: this.state.positionSalary
        };

        // console.log(formData);

        fetch('/api/position/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(result => {
                if (result.ret) {
                    message.success('数据添加成功，现在跳转到列表页', 2, () => {
                        this.props.history.push('/form/goods');
                    });
                } else {
                    message.error('数据添加失败，请重试', 2);
                }
            })
            .catch((error)=>{console.error('error', error)});
    }

    getBase64(img, callback) {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    normFile = e => {
        console.log('Upload event:', e)
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    handlePictureChange = info => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => {

                // 获取文件的信息，并且放置在state之中
                this.setState({
                    companyLogo: info.file
                })
                return this.setState({ imageUrl })
            })
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        }

        return (
            <div>
                <Form
                    layout={'horizontal'}
                    onSubmit={this.addFormSubmit.bind(this)}
                >
                    <FormItem
                        label="公司名称"
                        {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
                    >
                        <Input
                            onChange={this.handleChangeCompanyName.bind(this)}
                            value={this.state.companyName}
                            ref="cname"
                        />
                    </FormItem>
                    
                    <FormItem 
                        {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
                        label="公司Logo上传"
                    >
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile
                        })(
                            <Upload
                                name="companyLogo"
                                action="/api/position/add"
                                listType="picture"
                                // customRequest={ () => { return 0;} }
                                onChange={this.handlePictureChange.bind(this)}
                            >
                                <Button>
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        )}
                    </FormItem>

                    <FormItem
                        label="职位名称"
                        {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
                    >
                        <Input
                            onChange={this.handleChangePositionName.bind(this)}
                            value={this.state.positionName}
                            ref="pname"
                        />
                    </FormItem>
                    <FormItem
                        label="职位薪资"
                        {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
                    >
                        <Input
                            onChange={this.handleChangepositionSalary.bind(
                                this
                            )}
                            value={this.state.positionSalary}
                            ref="psalary"
                        />
                    </FormItem>
                    <FormItem {...{ wrapperCol: { span: 14, offset: 4 } }}>
                        <Button type="primary" size="large" htmlType="submit">
                            提交
                        </Button>
                        {' '}
                        <Button type="primary" size="large" onClick={() => this.props.history.go(-1)}>
                            返回
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(EditForm)
