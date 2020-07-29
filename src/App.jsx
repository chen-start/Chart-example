import React, {Component} from 'react';
import $ from 'jquery';
import Home from './views/Home.jsx';
import {
    Menu
} from 'antd';

import {
    Link,
    Route,
    Switch,
    Fragment
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Fragment>
                    <Menu onClick={this.handleClick} style={{width: 256, overflowY: 'auto', overflowX: 'hidden', height: '100vh'}} defaultSelectedKeys={['/']} defaultOpenKeys={['/']} mode="inline">
                        <Menu.SubMenu key="/" title={<span><span>Navigation Three</span></span>}>
                            <Menu.Item key="/">home页</Menu.Item>
                            <Menu.Item key="/home">home页</Menu.Item>
                            <Menu.Item key="3">home页</Menu.Item>
                            <Menu.Item key="4">home页</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" title={<span><span>Navigation Three</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub3" title={<span><span>Navigation Three</span></span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub4" title={<span><span>Navigation Three</span></span>}>
                            <Menu.Item key="13">Option 13</Menu.Item>
                            <Menu.Item key="14">Option 14</Menu.Item>
                            <Menu.Item key="15">Option 15</Menu.Item>
                            <Menu.Item key="16">Option 16</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub5" title={<span><span>Navigation Three</span></span>}>
                            <Menu.Item key="17">Option 13</Menu.Item>
                            <Menu.Item key="18">Option 14</Menu.Item>
                            <Menu.Item key="19">Option 15</Menu.Item>
                            <Menu.Item key="20">Option 16</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                    </Fragment>
                </Switch>
                <div>
                    <Route exact path='/home' component={Home} />
                </div>
            </div>
        );
    };

    componentDidMount() {

    };

    handleClick = e => {
        console.log('click ', e);
    };
}

export default App;
