import React from 'react';
import { Switch } from 'react-router-dom';

import { AuthWaitingComponent } from './AuthWaitingPage';
import { AppLayout } from './Layout';
import { LoginContainer } from './Login/LoginContainer';
import { PrivateRoute, PublicRoute } from './Routes';

function AppComponent() {
  return (
    <Switch>
      <PublicRoute path="/login" exact component={LoginContainer} />
      <PublicRoute path="/auth/:token" exact component={AuthWaitingComponent} />
      <PrivateRoute path="/" component={AppLayout} />
    </Switch>
  );
}

export default AppComponent;
