import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers/rootReducer';
import 'bootstrap/dist/css/bootstrap.css';

const middleWare = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  middleWare
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
