import React from 'react';
import css from './Menu.module.css';
import {Menu} from 'antd';
import {withRouter, Link} from 'react-router-dom';

class Menus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            props: undefined
        };
    };
    componentDidMount() {
        this.state.props = this.props;
    }

    render(){
        return (
            <div>
                <Menu onClick={this.handleClick} style={{ overflowY: 'auto', overflowX: 'hidden', height: '100vh'}} defaultOpenKeys={['/']} mode="inline">
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
            </div>
        )
    };
    handleClick(e){
        console.log(e);
    };
}

export default withRouter(Menus);