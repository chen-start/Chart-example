import React from 'react';
import eCharts from 'echarts';
import {withRouter} from 'react-router-dom';
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
        this.state.graph = eCharts.init(document.getElementById('graph'));

        this.state.graph.setOption({
            title: {
                show: true,
                text: 'LTP自然语言处理',
                textAlign: 'center'
            },
            yAxis: {
                show: false
            }
        })
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
                <div id='graph' style={{width: '100%', height: 800}} />
            </div>
        )
    }
}

export default withRouter(LTPPage);