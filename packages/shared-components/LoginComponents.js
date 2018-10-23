import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

import { BlockButton } from './BlockButton';
import { InputOutlined } from './InputOutlined';

class LoginForm extends Component {
  state = {
    email: '',
  };

  onEmailChange = (event) => {
    this.setState({
      email: event.currentTarget.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogin(this.state.email, this.clearEmail);
  };

  clearEmail = () => {
    this.setState({
      email: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} data-testid="loginForm">
        <InputOutlined
          data-testid="email"
          id="email"
          type="email"
          label="Email"
          onChange={this.onEmailChange}
          value={this.state.email}
        />
        <BlockButton className="login-button" type="submit" data-testid="signin" isLoading={this.props.isLoggingIn}>
          Signin
        </BlockButton>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

const LoginHeader = () => (
  <header>
    <h1>Project Delta</h1>
    <Divider />
  </header>
);

const LoginFooter = () => (
  <header>
    <Divider />
    <h1 className="text-center">Project Delta</h1>
  </header>
);

export { LoginForm, LoginHeader, LoginFooter };
