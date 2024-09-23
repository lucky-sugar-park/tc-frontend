// import { add, store, persistor } from './dynamic-store-management';
import { addReducer, store, persistor } from './dynamic-persist-store-management';

// const initialState = {};

// const store = configure(initialState);

// 추후 persist 고려 필요
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import storageSession from 'redux-persist/lib/storage/session'
// let persistor = persistStore(store);
// let persistor;

export {
    addReducer, store, persistor
}
