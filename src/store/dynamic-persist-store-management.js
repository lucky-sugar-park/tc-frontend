import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';


const initialReducers = {
    baseReducer : function reduce (state, action) {
        return {};
    },
}

var reducers = {};
reducers['baseReducer'] = initialReducers.baseReducer;

let keysToRemove = [];

export const getReducerMap = () => reducers;

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth'],
    // blacklist: []
  };

let persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

const reduce = function (state, action) {
    if (keysToRemove.length > 0) {
        state = { ...state }
        for (let key of keysToRemove) {
            delete state[key]
        }
        keysToRemove = []
    }

    return persistedReducer(state, action);
};

export const addReducer = (key, reducer) => {
    if (!key || reducers[key]) return
    reducers[key] = reducer;
    persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
    configure();
};

export const removeReducer = key => {
    if (!key || !reducers[key]) return;
    delete reducers[key]
    keysToRemove.push(key)
    persistedReducer = persistReducer(persistConfig, combineReducers(reducers));
    configure();
}

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(thunk, logger));

export let store = undefined;
export let persistor = undefined;

const configure = () => {
    store = createStore(reduce, {}, enhancer);
    persistor = persistStore(store);
}

configure();
