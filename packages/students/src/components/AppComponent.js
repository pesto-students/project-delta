import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format';

import { HeaderComponent } from '../../../shared-components/Header/Header';
import { FooterComponent } from '../../../shared-components/Footer';
import { LoginContainer } from './Login/LoginContainer';
import { AuthWaitingComponent } from './AuthWaitingPage';
import { DashboardContainer } from './DashboardPage';
import { ProfilePageComponent } from './ProfilePage';

class AppComponent extends React.Component {
  state = { user: {} };

  setUserData = newData => this.setState({
    user: {
      ...newData,
      dob: newData.dob ? format(newData.dob, 'YYYY-MM-DD') : undefined,
    },
  });

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={11} sm={8}>
            <Grid container direction="column" style={{ height: '100%' }}>
              <Grid item>
                <HeaderComponent
                  isLoggedIn={Boolean(user._id)}
                  menuBgUrl={user.profilePicUrl}
                />
              </Grid>

              <Grid item style={{ flexGrow: '1' }}>
                <Switch>
                  <Route
                    path="/auth/:token"
                    render={props => (
                      <AuthWaitingComponent
                        {...props}
                        setUserData={this.setUserData}
                      />
                    )}
                  />

                  <Route
                    path="/dashboard"
                    render={props => (
                      <DashboardContainer {...props} user={this.state.user} />
                    )}
                  />

                  <Route
                    path="/profile"
                    render={props => (
                      <ProfilePageComponent
                        {...props}
                        user={user}
                        setUserData={this.setUserData}
                      />
                    )}
                  />

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
}

export default AppComponent;
