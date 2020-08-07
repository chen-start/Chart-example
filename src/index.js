import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import Login from './views/Login/Login.jsx';
import Error from './views/Error/Error.jsx';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './config/axios.config.js';

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider, Spin } from 'antd';

import { store, persistor } from './store/index.js';
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Spin />} persistor={persistor}>
            <ConfigProvider  locale={zhCN}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" render={() => {
                            let user = store.getState().login;
                            return user ? (<App />) : (<Redirect to="/login" />);
                        }} />
                        <Route exact path="*" component={Error} />
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        </PersistGate>
    </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
