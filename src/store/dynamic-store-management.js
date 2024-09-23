// https://redux.js.org/usage/code-splitting
// 3가지의 dynamic reducer 구현 방법을 제시하고 있음 (아래는 3번째 방법을 적용했음)

import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

const initialReducers = {
  baseReducer : function reduce (state, action) {
    return {};
  },
}

export function createReducerManager(initialReducers) {
    // Create an object which maps keys to reducers
    var reducers = initialReducers;
  
    // Create the initial combinedReducer
    let combinedReducer = combineReducers(reducers);

    // An array which is used to delete state keys when reducers are removed
    let keysToRemove = []
  
    return {
      getReducerMap: () => reducers,
  
      // The root reducer function exposed by this object
      // This will be passed to the store
      reduce: function (state, action) {
        // If any reducers have been removed, clean up their state first
        if (keysToRemove.length > 0) {
            state = { ...state }
            for (let key of keysToRemove) {
                delete state[key]
            }
            keysToRemove = []
        }
  
        // Delegate to the combined reducer
        return combinedReducer(state, action);
      },
  
      // Adds a new reducer with the specified key
      add: (key, reducer) => {
        if (!key || reducers[key]) {
          return
        }
        // Add the reducer to the reducer mapping
        reducers[key] = reducer;
        // Generate a new combined reducer
        combinedReducer = combineReducers(reducers);
      },
  
      // Removes a reducer with the specified key
      remove: key => {
        if (!key || !reducers[key]) {
          return
        }
  
        // Remove it from the reducer mapping
        delete reducers[key]
  
        // Add the key to the list of keys to clean up
        keysToRemove.push(key)
  
        // Generate a new combined reducer
        combinedReducer = combineReducers(reducers);
      }
    }
  }

// production 모드일 경우에는 로그를 적용하지 않음
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(thunk, logger));

let store = undefined;
export function configure (initialState) {
  if(store !== undefined) return store;

    const reducerManager = createReducerManager(initialReducers);
  
    // Create a store with the root reducer function being the one exposed by the manager.
    store = createStore(reducerManager.reduce, initialState, enhancer);
    
    // Optional: Put the reducer manager on the store so it is easily accessible
    store.reducerManager = reducerManager

    return store;
}
