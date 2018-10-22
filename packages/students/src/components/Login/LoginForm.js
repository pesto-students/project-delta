import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { InputOutlined } from '../../../../shared-components/InputOutlined';
import './style.css';

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

export { LoginForm };
