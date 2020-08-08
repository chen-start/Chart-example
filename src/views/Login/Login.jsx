import React from 'react';
import css from './Login.module.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Input, Button, Modal, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            visible: false,
            user: '',
            pass: '',
            id: '',
            state: undefined
        }
    }

    Login(){
        let _this = this;
        this.$http({
            method: 'POST',
            url: '/toLogin',
            data: {
                username: _this.state.username,
                password: _this.state.password
            }
        }).then(res => {
            console.log(res);
            if(res.data.code === 200){
                this.props.dispatch({ type: "LOGIN", user: _this.state.username });
                this.props.history.push("/");
            }
        });
    }

    toRegister(){
        this.setState({
            user: '',
            pass: '',
            id: '',
            visible: true
        });
    }

    register(){
        let _this = this;
        this.$http({
            method: 'POST',
            url: '/toRegister',
            data: {
                username: _this.state.user,
                password: _this.state.pass,
                id: _this.state.id
            }
        }).then(res => {
            _this.setState({
                username: _this.state.user,
                password: _this.state.pass,
                visible: false
            });
            message.success('注册成功！');
        })
    }

    render(){
        return (
            <div className={css.login}>
                <Form
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    labelAlign={'left'}
                    name="basic"
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
                        <Button type="primary" htmlType="submit" onClick={(e) => { this.Login(e) }} block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Col span={16}>
                        <Button type="primary" htmlType="submit" onClick={(e) => { this.toRegister(e) }} block>
                            注册
                        </Button>
                    </Col>
                </div>
                <Modal title={'注册'} visible={this.state.visible} closable={false} footer={null} maskClosable={false}>
                    <Form labelCol={{span: 4}} wrapperCol={{span: 18}} labelAlign={'left'}>
                        <Form.Item label={'ID'}>
                            <Input prefix={<KeyOutlined />} value={this.state.id} onChange={(e) => {this.setState({id: e.target.value})}} />
                        </Form.Item>
                        <Form.Item label={'账号'}>
                            <Input prefix={<UserOutlined />} value={this.state.user} onChange={(e) => {this.setState({user: e.target.value})}} />
                        </Form.Item>
                        <Form.Item label={'密码'}>
                            <Input.Password prefix={<LockOutlined />} value={this.state.pass} onChange={(e) => {this.setState({pass: e.target.value})}} />
                        </Form.Item>
                        <Form.Item style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div className={css.box}>
                                <Button onClick={() => {this.register()}}>注册</Button>
                                <Button onClick={() => {this.setState({visible: false})}}>取消</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect()(withRouter(Login));