import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/appComponent';

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root'),
);
