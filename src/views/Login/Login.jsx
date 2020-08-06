import React from 'react';
import css from './Login.module.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    Login(){
        let _this = this;
        if(_this.state.username !== 'admin' || _this.state.password !== '0000'){
            return message.error('账号或密码错误');
        }

        this.props.dispatch({ type: "LOGIN", user: _this.state.username });
        this.props.history.push("/");
    }

    change(){

    }

    render(){
        return (
            <div className={css.login}>
                <Form
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    labelAlign={'left'}
                    name="basic"
                    onFinish={(e) => { this.Login(e) }}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<UserOutlined />} id='username' value={this.state.username} onChange={(e) => {this.setState({ username: e.target.value })}} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<UnlockOutlined />} id='password' value={this.state.password} onChange={(e) => {this.setState({ password: e.target.value })}} />
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default connect()(withRouter(Login));