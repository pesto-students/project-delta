import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import { NotificationBlock } from '../../../../shared-components/NotificationBlock';
import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator/index';
import { HTTP } from '../../../../shared-utils/services/http';
import { getToken } from '../../../../shared-utils/services/loginToken';
import { LoginForm } from '../../../../shared-components/LoginComponents';
import { MSGS } from '../../constants/MSGS';
import { HeaderComponent } from '../../../../shared-components/Header';
import { FooterComponent } from '../../../../shared-components/Footer';

class LoginContainer extends Component {
  state = {
    isLoggingIn: false,
    loginStatus: '',
    message: '',

    loading: getToken('token') !== null,
    existingTokenVerificationDetails: {
      authSuccess: false,
      isNewUser: null,
      email: null,
    },
  }

  componentDidMount() {
    const { loading } = this.state;
    if (loading) {
      HTTP.POST('/verifyToken', undefined, undefined, true)
        .then(res => this.setState({
          loading: false,
          existingTokenVerificationDetails: {
            ...res,
            authSuccess: !!res.authentication,
          },
        }))
        .catch((e) => {
          this.setState({ loading: false });
          console.error(e); // eslint-disable-line no-console
        });
    }
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
      loading,
      existingTokenVerificationDetails: etvDetails,
      isLoggingIn,
      loginStatus,
      message,
    } = this.state;

    if (loading) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
          <LoadingIndicator />
        </Grid>
      );
    }

    // if user already has a token, redirect them to profile page or dashboard
    //   depending on if they are a new user or not
    if (etvDetails.authSuccess) {
      if (etvDetails.isNewUser) {
        return (
          <Redirect
            to={{
              pathname: '/profile',
              state: { editing: true, loading: false, user: { email: etvDetails.email } },
            }}
          />
        );
      }

      return <Redirect to="/dashboard" />;
    }

    return (
      <Grid container justify="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={10} md={8}>
          <HeaderComponent />
        </Grid>

        <Grid item xs={10} md={8}>
          <p className="text-center">Welcome to Project Delta!</p>
          <p className="text-center">Enter your email below to get started.</p>
        </Grid>

        {loginStatus === ''
          ? null
          : (
            <Grid container justify="center" alignItems="center">
              <NotificationBlock
                variant={loginStatus}
                message={message}
                onClose={this.removeNotification}
              />
            </Grid>
          )}

        <Grid item xs={10} sm={6}>
          <LoginForm
            isLoggingIn={isLoggingIn}
            handleLogin={this.handleLogin}
          />
        </Grid>

        <Grid item xs={10} md={8}>
          <FooterComponent />
        </Grid>
      </Grid>
    );
  }
}

export { LoginContainer };
