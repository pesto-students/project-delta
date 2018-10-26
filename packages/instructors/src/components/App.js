import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { AppLayout } from './Layout';
import { PrivateRoute } from './PrivateRoute';

function AppComponent() {
  return (
    <Switch>
      <Route path="/login" exact component={LoginContainer} />
      <Route path="/auth/:token" exact component={AuthWaitingComponent} />
      <PrivateRoute path="/" component={AppLayout} />
    </Switch>
  );
}

export default AppComponent;
