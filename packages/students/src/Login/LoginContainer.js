import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import { LoginHeader } from './Header';
import { LoginFooter } from './Footer';
import LoginForm from './LoginForm';
import { HTTP } from '../Services/http';
import './style.css';

class LoginContainer extends Component {
  state = {
    isLoggingIn: false,
  }

  handleLogin = (email, clearForm) => {
    const requestBody = { email };
    HTTP.POST('', requestBody)
      .then(() => {
        // console.log(res);
        clearForm();
      })
      .catch(() => {
        // console.log(err);
      });
  }

  render() {
    const { isLoggingIn } = this.state;
    return (
      <div className="login-container">
        <Grid container justify="center" style={{ height: '100%' }}>
          <Grid item xs={10} md={8} lg={7}>
            <LoginHeader />
          </Grid>

          <Grid item xs={12} md={8} lg={7}>
            <Grid container justify="center">
              <Grid item xs={12} md={8} lg={6}>
                <p className="text-center">
                  Welcome to Project Delta!
                </p>
                <p className="text-center">
                  Enter your email below to get started.
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={10} md={8} lg={7}>
            <Grid container justify="center">
              <Grid item xs={12} md={8} lg={6}>
                <LoginForm
                  isLoggingIn={isLoggingIn}
                  handleLogin={this.handleLogin}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={10} md={8} lg={7}>
            <LoginFooter />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginContainer;
