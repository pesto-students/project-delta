import React from 'react';
import { Route } from 'react-router-dom';

import { LoginContainer } from './Login/LoginContainer';

function AppComponent() {
  return (
    <React.Fragment>
      <Route path="/" exact component={LoginContainer} />
    </React.Fragment>
  );
}

export default AppComponent;
