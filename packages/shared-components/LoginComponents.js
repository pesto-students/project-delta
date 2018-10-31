import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    const { handleLogin } = this.props;
    const { email } = this.state;
    handleLogin(email, this.clearEmail);
  };

  clearEmail = () => {
    this.setState({
      email: '',
    });
  };

  render() {
    const { isLoggingIn } = this.props;
    const { email } = this.state;
    return (
      <form onSubmit={this.handleSubmit} data-testid="loginForm">
        <InputOutlined
          data-testid="email"
          id="email"
          type="email"
          label="Email"
          onChange={this.onEmailChange}
          value={email}
        />
        <BlockButton className="login-button" type="submit" data-testid="signin" isLoading={isLoggingIn}>
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

export { LoginForm };
