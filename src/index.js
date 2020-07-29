import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

import {
    HashRouter
} from 'react-router-dom';
import {Provider} from 'react-redux';

ReactDOM.render(
  <HashRouter Provider={Provider}>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
