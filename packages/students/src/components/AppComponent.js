import React from 'react';
import { Route } from 'react-router-dom';

import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';

function AppComponent() {
  return (
    <React.Fragment>
      <Route path="/" exact component={LoginContainer} />
      <Route path="/auth" component={AuthWaitingComponent} />
    </React.Fragment>
  );
}

export default AppComponent;
