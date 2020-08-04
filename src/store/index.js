import {createStore, combineReducers} from 'redux';

import login from '../reduces/index.js';

let reducer = combineReducers({
    login
});

export default createStore(reducer);