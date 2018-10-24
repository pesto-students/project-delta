import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

import { NotificationBlock } from '../../../../shared-components/NotificationBlock';
import { generateToken } from '../../services/login';
import { LoginForm, LoginFooter, LoginHeader } from '../../../../shared-components/LoginComponents';
import { MSGS } from '../../constants/MSGS';

import './style.css';

class LoginContainer extends Component {
  state = {
    isLoggingIn: false,
    loginStatus: '',
    message: '',
  }

  updateState = (loginStatus, message) => {
    this.setState({
      isLoggingIn: false,
      loginStatus,
      message,
    });
  }

  handleLogin = (email, clearForm) => {
    if (!isEmail(email)) {
      this.updateState('error', MSGS.EMAIL_INVALID);
      return;
    }

    this.clearForm = clearForm;
    const requestBody = { email };

    this.setState({
      isLoggingIn: true,
    });

    generateToken(requestBody)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  handleError = (err) => {
    const message = MSGS[err.error] ? MSGS[err.error] : MSGS.UNKNOWN_ERROR;
    this.updateState('error', message);
  }

  handleSuccess = () => {
    this.clearForm();
    this.updateState('success', MSGS.MAIL_SUCCESS);
  }

  removeNotification = () => {
    this.updateState('', '');
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

          {loginStatus === '' ?
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

export { LoginContainer };
