import React from 'react';
import css from './Menu.module.css';
import {Menu} from 'antd';
import {
    Link,
    Switch
} from 'react-router-dom';

export default class Menus extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Menu onClick={this.handleClick} style={{width: 256, overflowY: 'auto', overflowX: 'hidden', height: '100vh'}} defaultOpenKeys={['/']} mode="inline">
                        <Menu.Item key={'/'}>
                            <Link to={'/'}>
                                说明
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/home'}>
                            <Link to={'/home'}>
                                双层图表嵌套
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Switch>
            </div>
        )
    }
    handleClick = e => {
        console.log('click ', e);
    };
}