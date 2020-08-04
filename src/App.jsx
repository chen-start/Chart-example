import React, {Component} from 'react';
import css from './App.module.css';

import { HashRouter, Route, Switch, withRouter, Link} from 'react-router-dom';

import {Layout, Menu} from "antd";

import Home from './views/Home/Home.jsx';
import Index from "./views/Index.jsx";
import DoubleLayer from "./views/DoubleLayer.jsx";
import OperationalFlowchart from "./views/OperationalFlowchart.jsx";
import LTPPage from "./views/LTPPage.jsx";

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
                            <Route exact path='/' component={Home} />
                            <Route exact path='/index' component={Index} />
                            <Route exact path='/doubleLayer' component={DoubleLayer} />
                            <Route exact path='/OperationalFlowchart' component={OperationalFlowchart} />
                            <Route exact path='/LTPPage' component={LTPPage} />
                        </Switch>
                    </Layout.Content>
                </Layout>
            </HashRouter>
        );
    };
}

export default withRouter(App);
