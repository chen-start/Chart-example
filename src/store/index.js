import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import login from '../reduces/index.js';

const config = {
    key: 'root',
    storage
}

let reducers = combineReducers({
    login
});

const persistedReducer = persistReducer(config, reducers);



export const store =  createStore(persistedReducer);

export const persistor = persistStore(store);