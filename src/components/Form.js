import React, { Component } from 'react'

import {
    Switch,
    HashRouter as Router,
    Link,
    NavLink,
    Redirect,
    Route
} from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'

import Goods from './Goods'
import Goods2 from './Goods2'
import Page404 from './Page404'
import Edit from "./Edit";
import PositionAdd from "./PositionAdd";
import ComponentTest1 from "./ComponentTest1";

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class SiderLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
        mode: 'inline'
    }

    onCollapse = collapsed => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        })
    }


    render() {
        const { match } = this.props;

        return (
            <Layout id="components-layout-side">
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode={this.state.mode}
                        defaultSelectedKeys={['6']}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span className="nav-text">用户</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1">Tom</Menu.Item>
                            <Menu.Item key="2">Bill</Menu.Item>
                            <Menu.Item key="3">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="team" />
                                    <span className="nav-text">商品</span>
                                </span>
                            }
                        >
                            <Menu.Item key="4">
                                <Link to={`${match.url}/goods`}>商品管理</Link>
                            </Menu.Item>
                            {/* <Menu.Item key="5">
                                <Link to={`${match.url}/goods2`}>商品管理222</Link>
                            </Menu.Item> */}
                        </SubMenu>
                        {/* <Menu.Item key="6">
                            <span>
                                <Icon type="file" />
                                <span className="nav-text">File</span>
                            </span>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="mainContent">
                    <Header style={{ background: '#f00', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        {/* <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        {/* <Router> */}
                            <Switch>
                                <Route path={`${match.path}/goods`} component={Goods} />
                                <Route path={`${match.path}/edit/:id`} component={Edit} />
                                <Route path={`${match.path}/goods2`} component={Goods2} />
                                <Route path={`${match.path}/positionadd`} component={PositionAdd} />
                                <Route path={`${match.path}/componenttest1`} component={ComponentTest1} />
                                {/* <Route path="/404" compoent={Page404} />
                                <Redirect to="/404" /> */}
                            </Switch>
                        {/* </Router> */}
                    </Content>
                    <Footer style={{ textAlign: 'center', maxHeight: 100 }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default SiderLayout
