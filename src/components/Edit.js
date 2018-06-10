import React, { Component } from 'react'
import { Form, Input, Button, Radio } from 'antd'

import PicturesWall from './antComponent/PicturesWall'

const FormItem = Form.Item

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            positionID: '',
            companyName: '',
            companyLogo: '',
            positionName: '',
            positionSalary: '',
            companyLogoObj: {}
        };
        this.getPicInfo = this.getPicInfo.bind(this)
    }

    async componentWillMount() {
        const { match } = this.props;
        const positionID = match.params.id;

        await fetch('/api/position/item/' + positionID)
            .then(response => response.json())
            .then(result => {
                const data = result.data;
                this.setState({
                    positionID: data._id,
                    companyName: data.companyName,
                    companyLogo: data.companyLogo,
                    positionName: data.positionName,
                    positionSalary: data.positionSalary
                });
            });
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

    editFormSubmit() {
        const { match } = this.props;

        const formData = {
            companyName: this.state.companyName,
            positionName: this.state.positionName,
            positionSalary: this.state.positionSalary
        };

        fetch('api/position/edit/' + this.state.positionID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(result => {
                if (result.ret) {
                    this.props.history.push('/form/goods');
                }
            })
    }

    handleGoBack() {
        this.props.history.go(-1);
    }

    getPicInfo(fileObj) {
        console.log('edit: --------------------------------------- ');
        console.log(fileObj);
    }



    render() {
        return (
            <div>
                <Form layout={'horizontal'} onSubmit={this.editFormSubmit.bind(this)}>
                    <FormItem label="公司名称" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
                        <Input onChange={this.handleChangeCompanyName.bind(this)} value={this.state.companyName} ref="cname"/>
                    </FormItem>
                    <FormItem label="公司Logo" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
                        <PicturesWall 
                            positionID={this.state.positionID}
                            companyLogoURL={this.state.companyLogo} 
                            getPicInfo={this.getPicInfo}
                        />
                    </FormItem>
                    <FormItem label="职位名称" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
                        <Input onChange={this.handleChangePositionName.bind(this)} value={this.state.positionName} ref="pname"/>
                    </FormItem>
                    <FormItem label="职位薪资" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
                        <Input onChange={this.handleChangepositionSalary.bind(this)} value={this.state.positionSalary} ref="psalary"/>
                    </FormItem>
                    <FormItem {...{wrapperCol: { span: 14, offset: 4 }}}>
                        <Button type="primary" size="large" htmlType="submit">
                            提交
                        </Button>
                        {' '}
                        <Button type="primary" size="large" onClick={this.handleGoBack.bind(this)}>
                            返回
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(EditForm) 


