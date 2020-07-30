import React from 'react';
import {Breadcrumb} from "antd";
import {HomeOutlined} from '@ant-design/icons';
import css from './OperationalFlowchart.module.css';

class OperationalFlowchart extends React.Component{
    render(){
        return (
            <div className={css.OperationalFlowchart}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        可操作流程图
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

export default OperationalFlowchart;