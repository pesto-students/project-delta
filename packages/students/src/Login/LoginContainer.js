import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import { LoginHeader } from './Header';
import { LoginFooter } from './Footer';
import LoginForm from './LoginForm';
import './style.css';

class LoginContainer extends Component {
  state = {
    email: '',
    isLoggingIn: false,
  }

  onLogin = (event) => {
    event.preventDefault();
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    const { email, isLoggingIn } = this.state;
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
                  email={email}
                  isLoggingIn={isLoggingIn}
                  onLogin={this.onLogin}
                  onEmailChange={this.onEmailChange}
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
