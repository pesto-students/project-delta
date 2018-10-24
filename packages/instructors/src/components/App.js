import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { AppLayout } from './Layout';

function AppComponent() {
  return (
    <Switch>
      <Route path="/login" exact component={LoginContainer} />
      <Route path="/auth/:token" exact component={AuthWaitingComponent} />
      <Route path="/" component={AppLayout} />
    </Switch>
  );
}

export default AppComponent;
