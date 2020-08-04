import React, {Component} from 'react';
import css from './App.module.css';

import {Route} from 'react-router-dom';

import Home from './views/Home/Home.jsx';
import Login from "./views/Login/Login.jsx";

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log()
    }

    render() {
        return (
            <div className={css.app}>
                {/*<Route path={'/'} component={Home} />*/}
                <Home />
                <Route exact path={'/login'} component={Login} />
            </div>
        );
    };
}

export default App;
