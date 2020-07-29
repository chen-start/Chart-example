import React, {Component} from 'react';
import $ from 'jquery';
import css from './App.module.css';

import Home from './views/Home.jsx';
import Index from './views/Index.jsx';

import Menus from './components/Menu/Menus.jsx';


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
                <Menus />
                <div>
                    <Route exact path={'/'} component={Index} />
                    <Route exact path={'/home'} component={Home} />
                </div>
            </div>
        );
    };

    componentDidMount() {

    };


}

export default App;
