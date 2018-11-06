import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import { NotificationBlock } from '../../../../shared-components/NotificationBlock';
import { HTTP } from '../../../../shared-utils/services/http';
import { getToken } from '../../../../shared-utils/services/loginToken';
import { LoginForm } from '../../../../shared-components/LoginComponents';
import { MSGS } from '../../constants/MSGS';

class LoginContainer extends Component {
  state = {
    isLoggingIn: false,
    loginStatus: '',
    message: '',

    curToken: getToken('token'),
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

    HTTP.POST('/generateToken', requestBody)
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
    const {
      isLoggingIn,
      loginStatus,
      message,
      curToken,
    } = this.state;

    if (curToken !== null) {
      return <Redirect to={`/auth/${curToken}`} />;
    }

    return (
      <Grid container direction="column" justify="space-evenly" alignItems="center" style={{ height: '100%' }}>
        <Grid item>
          <p className="text-center">Welcome to Project Delta!</p>
          <p className="text-center">Enter your email below to get started.</p>
        </Grid>

        {loginStatus === ''
          ? null
          : (
            <Grid container direction="row" justify="center">
              <Grid item xs={10} sm={8} md={6}>
                <NotificationBlock
                  variant={loginStatus}
                  message={message}
                  onClose={this.removeNotification}
                />
              </Grid>
            </Grid>
          )}

        <Grid container direction="row" justify="center">
          <Grid item xs={10} sm={8} md={6}>
            <LoginForm
              isLoggingIn={isLoggingIn}
              handleLogin={this.handleLogin}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export { LoginContainer };
