import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';

import App from './components/App';

import './main.css';

ReactDOM.render(
  <BrowserRouter><JssProvider><App /></JssProvider></BrowserRouter>,
  document.getElementById('root'),
);
