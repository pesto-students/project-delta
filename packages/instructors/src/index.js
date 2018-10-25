import 'babel-polyfill'; // polyfill for regenerator runtime

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';

import App from './components/App';
import { store } from './redux/store';

import './main.css';

render(
  <Provider store={store}>
    <BrowserRouter>
      <JssProvider>
        <App />
      </JssProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
