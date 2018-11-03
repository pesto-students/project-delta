import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { HeaderComponent } from '../../../shared-components/Header';
import { FooterComponent } from '../../../shared-components/Footer';
import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { DashboardContainer } from './DashboardPage';
import { ProfilePageComponent } from './ProfilePage';

function AppComponent() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container justify="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={11} sm={8}>
          <Grid container direction="column" style={{ height: '100%' }}>
            <Grid item><HeaderComponent /></Grid>
            <Grid item style={{ flexGrow: '1' }}>
              <Switch>
                <Route path="/auth/:token" component={AuthWaitingComponent} />
                <Route path="/dashboard" component={DashboardContainer} />
                <Route path="/profile" component={ProfilePageComponent} />
                <Route component={LoginContainer} />
              </Switch>
            </Grid>
            <Grid item><FooterComponent /></Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AppComponent;
