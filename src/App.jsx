import React, {Component} from 'react';
import loading from '@loadable/component';

import { HashRouter, Route, Switch, withRouter, Link} from 'react-router-dom';

import {Layout, Menu} from "antd";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handleClick(){

    }

    render() {
        return (
            <HashRouter>
                <Layout>
                    <Layout.Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, backgroundColor: '#fff'}} collapsed={false}>
                        <Menu onClick={this.handleClick} defaultOpenKeys={['index']} mode="inline">
                            <Menu.Item key='index'>
                                <Link to='/index'>
                                    说明
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='doubleLayer'>
                                <Link to='/doubleLayer'>
                                    双层图表嵌套
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='OperationalFlowchart'>
                                <Link to='/OperationalFlowchart'>
                                    可操作流程图
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='LTPPage'>
                                <Link to='/LTPPage'>
                                    LTP
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Layout.Sider>
                    <Layout.Content style={{marginLeft: 200}}>
                        <Switch>
                            <Route exact path='/' component={loading(() => import('./views/Home/Home.jsx'))} />
                            <Route exact path='/index' component={loading(() => import('./views/Index/Index.jsx'))} />
                            <Route exact path='/doubleLayer' component={loading(() => import('./views/DoubleLayer/DoubleLayer.jsx'))} />
                            <Route exact path='/OperationalFlowchart' component={loading(() => import('./views/OperationalFlowchart/OperationalFlowchart.jsx'))} />
                            <Route exact path='/LTPPage' component={loading(() => import('./views/LTPPage/LTPPage.jsx'))} />
                        </Switch>
                    </Layout.Content>
                </Layout>
            </HashRouter>
        );
    };
}

export default withRouter(App);