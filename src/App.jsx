import React, {Component} from 'react';
import css from './App.module.css';

import Home from './views/Home.jsx';
import Index from './views/Index.jsx';

import Menus from './components/Menu/Menus.jsx';
import {Layout} from 'antd';

import {
    Route
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={css.app}>
                <Layout>
                    <Layout.Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0,}}>
                        <Menus />
                    </Layout.Sider>
                    <Layout.Content style={{marginLeft: 200}}>
                        <Route exact path={'/'} component={Index} />
                        <Route exact path={'/home'} component={Home} />
                    </Layout.Content>
                </Layout>
            </div>
        );
    };

    componentDidMount() {

    };


}

export default App;
