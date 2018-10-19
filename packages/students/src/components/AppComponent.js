import React from 'react';
import { Route } from 'react-router-dom';

import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { DashboardContainer } from './DashboardPage';
import { ProfilePageComponent } from './ProfilePage';

function AppComponent() {
  return (
    <React.Fragment>
      <Route path="/" exact component={LoginContainer} />
      <Route path="/auth/:token" exact component={AuthWaitingComponent} />
      <Route path="/dashboard" exact component={DashboardContainer} />
      <Route path="/profile" exact component={ProfilePageComponent} />
    </React.Fragment>
  );
}

export default AppComponent;
