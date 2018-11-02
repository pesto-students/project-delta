import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { DashboardContainer } from './DashboardPage';
import { ProfilePageComponent } from './ProfilePage';

function AppComponent() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route path="/auth/:token" component={AuthWaitingComponent} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Route path="/profile" component={ProfilePageComponent} />
        <Route component={LoginContainer} />
      </Switch>
    </React.Fragment>
  );
}

export default AppComponent;
