import React from 'react';
import {Route} from "react-router-dom";

import {Layout} from "antd";

import Menus from "../../components/Menu/Menus";
import Index from "../Index";
import OperationalFlowchart from "../OperationalFlowchart.jsx";
import LTPPage from "../LTPPage.jsx";
import DoubleLayer from '../DoubleLayer.jsx';

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
                <Layout>
                    <Layout.Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0,}}>
                        <Menus />
                    </Layout.Sider>
                    <Layout.Content style={{marginLeft: 200}}>
                        <Route exact path={'/index'} component={Index} />
                        <Route exact path={'/doubleLayer'} component={DoubleLayer} />
                        <Route exact path={'/OperationalFlowchart'} component={OperationalFlowchart} />
                        <Route exact path={'/LTPPage'} component={LTPPage} />
                    </Layout.Content>
                </Layout>
            </div>
        )
    }
}

export default Home;