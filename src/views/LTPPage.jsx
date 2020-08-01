import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';

import {Breadcrumb} from "antd";
import {HomeOutlined} from '@ant-design/icons';

class LTPPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            graph: undefined
        }
    }
    componentDidMount() {
        this.getData();
        this.setLtp();
        console.log('width: ' , $('#graph').width() , ', ' , 'height: ' , $('#graph').height());
    };

    getData(){
        $.ajax({
            method: 'POST',
            url: 'http://39.96.43.154:8080/api',
            data: {
                text: '他叫汤姆去拿外衣。'
            }
        }).then(res => {
            console.log(res);
        })
    };

    setLtp(){
        let graph = document.getElementById('graph').getContext('2d');
        this.setState({
            graph
        });
    };

    render(){
        return (
            <div style={{padding: '10px', boxSizing: 'border-box'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined/>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        LTP
                    </Breadcrumb.Item>
                </Breadcrumb>
                <canvas id='graph' style={{width: '100%', height: 800, border: '1px solid #ccc', boxSizing: 'border-box'}} />
            </div>
        )
    }
}

export default withRouter(LTPPage);