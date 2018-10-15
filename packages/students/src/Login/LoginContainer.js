import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import validator from 'validator';

import { LoginHeader } from './Header';
import { LoginFooter } from './Footer';
import LoginForm from './LoginForm';
import { HTTP } from '../Services/http';
import NotificationBlock from '../../../shared-components/NotificationBlock';
import './style.css';

class LoginContainer extends Component {
  state = {
    isLoggingIn: false,
    loginStatus: '',
    message: '',
  }

  LOGIN_STATUS = {
    LOGIN_SUCCESS: 'success',
    LOGIN_FAILED: 'error',
  }

  MESSAGES = {
    INVALID_EMAIL: 'Invalid email. Please recheck your email.',
    UNKNOWN_ERROR: 'Unknown error occurred. Please try again after some time.',
    MAIL_SUCCESS: 'Magic sign in link sent to your email. Click the link to sign in.',
  }

  updateState = (loginStatus, message) => {
    this.setState({
      isLoggingIn: false,
      loginStatus,
      message,
    });
  }

  handleLogin = (email, clearForm) => {
    if (!validator.isEmail(email)) {
      this.updateState(this.LOGIN_STATUS.LOGIN_FAILED, this.MESSAGES.INVALID_EMAIL);
      return;
    }
    this.clearForm = clearForm;
    const requestBody = { email };

    this.setState({
      isLoggingIn: true,
    });

    HTTP.POST('/generateToken', requestBody)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  handleError = () => {
    this.updateState(this.LOGIN_STATUS.LOGIN_FAILED, this.MESSAGES.UNKNOWN_ERROR);
  }

  handleSuccess = (res) => {
    if (res.status === 200) {
      this.clearForm();
      this.updateState(this.LOGIN_STATUS.LOGIN_SUCCESS, this.MESSAGES.MAIL_SUCCESS);
    } else if (res.status === 400) {
      this.updateState(this.LOGIN_STATUS.LOGIN_FAILED, this.MESSAGES.INVALID_EMAIL);
    } else {
      this.updateState(this.LOGIN_STATUS.LOGIN_FAILED, this.MESSAGES.UNKNOWN_ERROR);
    }
  }

  removeNotification = () => {
    this.setState({
      loginStatus: '',
      message: '',
    });
  }

  render() {
    const { isLoggingIn, loginStatus, message } = this.state;
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

          { loginStatus === '' ?
            null :
            <Grid item xs={10} md={8} lg={7}>
              <Grid container justify="center">
                <Grid item xs={12} md={8} lg={6}>
                  <NotificationBlock
                    variant={loginStatus}
                    message={message}
                    onClose={this.removeNotification}
                  />
                </Grid>
              </Grid>
            </Grid>
          }

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
