import React, { Component } from 'react'
import { Table, Icon, Button, Popconfirm, message } from 'antd'
import { createStore } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import reducer from '../store/reducers'

const store = createStore(reducer)

class Goods extends Component {
    columns = [
        {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName'
        },
        {
            title: '公司 Logo',
            key: 'companyLogo',
            render: item => {
                return (
                    <div>
                        <img
                            src={`http://localhost:4000/uploads/${
                                item.companyLogo
                            }`}
                            alt=""
                            style={{ height: 80, width: 80 }}
                        />
                    </div>
                )
            }
        },
        {
            title: '职位名称',
            dataIndex: 'positionName',
            key: 'positionName'
        },
        {
            title: '职位薪资',
            dataIndex: 'positionSalary',
            key: 'positionSalary'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Link to={`/form/edit/${text.key}`}>
                            <Button type="primary">
                                编辑<Icon type="edit" />
                            </Button>
                        </Link>
                        <Popconfirm
                            title="确定要删除该条记录么？"
                            onConfirm={() => this.confirm(text.key)}
                            onCancel={this.cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger">
                                删除<Icon type="delete" />
                            </Button>
                        </Popconfirm>
                    </span>
                )
            }
        }
    ]

    cancel(e) {
        message.info('取消删除')
    }

    // 在确认删除的时候， 重新发送请求数据对列表进行重新渲染， 而不要直接删除 goodsList 之中的数据， 而重新渲染列表。
    confirm = (positionID, e) => {
        fetch(`/api/position/remove/${positionID}`)
            .then(response => response.json())
            .then(result => {
                if (result.ret) {
                    fetch('/api/position/m/list')
                        .then(response => response.json())
                        .then(result => {
                            const getGoodsList = result.data.map(
                                ({
                                    _id,
                                    companyName,
                                    companyLogo,
                                    positionName,
                                    positionSalary
                                }) => ({
                                    key: _id,
                                    companyName,
                                    companyLogo,
                                    positionName,
                                    positionSalary
                                })
                            )
                            this.setState({
                                goodsList: getGoodsList
                            })
                        })
                    message.success('删除成功')
                }
            })
    }

    constructor(props) {
        super(props)
        // store.subscribe(() => {
        //     this.forceUpdate()
        // })
        this.state = {
            goodsList: [],
            deletePositionIdList: []
        }
    }

    componentWillMount() {
        fetch('/api/position/m/list')
            .then(response => response.json())
            .then(result => {
                const getGoodsList = result.data.map(
                    ({
                        _id,
                        companyName,
                        companyLogo,
                        positionName,
                        positionSalary
                    }) => ({
                        key: _id,
                        companyName,
                        companyLogo,
                        positionName,
                        positionSalary
                    })
                )

                this.setState({
                    goodsList: getGoodsList
                })
            })
    }

    // this.setState({
    //     deletePositionIdList: store.getState()
    // });

    // for (let i = 0; i < this.state.deletePositionIdList.length; i++) {
    //     getGoodsList.filer(item => item.key === this.state.deletePositionIdList[i]);
    // }

    render() {
        return (
            <div>
                <Link to={`/form/positionadd`}>
                    <Button
                        type="primary"
                        size="large"
                        style={{ marginTop: 20 }}
                    >
                        新增职位<Icon type="folder-add" />
                    </Button>
                </Link>
                <br />
                <br />
                <Table
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: 5
                    }}
                    dataSource={this.state.goodsList}
                />
            </div>
        )
    }
}

export default Goods
