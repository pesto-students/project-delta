import React from 'react';
import { Route } from 'react-router-dom';

import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { DashboardContainer } from './DashboardPage';

function AppComponent() {
  return (
    <React.Fragment>
      <Route path="/" exact component={LoginContainer} />
      <Route path="/auth/:token" exact component={AuthWaitingComponent} />
      <Route path="/dashboard" exact component={DashboardContainer} />
    </React.Fragment>
  );
}

export default AppComponent;
