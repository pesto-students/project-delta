import React from 'react';
import { Switch } from 'react-router-dom';

import { AuthWaitingComponent } from './AuthWaitingPage';
import { AppLayoutContainer } from './Layout';
import { LoginContainer } from './Login/LoginContainer';
import { PrivateRoute, PublicRoute } from './Routes';

function AppComponent() {
  return (
    <Switch>
      <PublicRoute path="/login" exact component={LoginContainer} />
      <PublicRoute path="/auth/:token" exact component={AuthWaitingComponent} />
      <PrivateRoute path="/" component={AppLayoutContainer} />
    </Switch>
  );
}

export default AppComponent;
