import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootreducer from './reducers/index.js';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reportWebVitals from './reportWebVitals';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootreducer);
const store = createStore(persistedReducer);
let persistor = persistStore(store);

console.log("hello");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </React.StrictMode >

);

reportWebVitals(); 