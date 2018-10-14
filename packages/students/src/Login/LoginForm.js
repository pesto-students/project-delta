import PropTypes from 'prop-types';
import React from 'react';

import BlockButton from '../../../shared-components/BlockButton';
import InputOutlined from '../../../shared-components/InputOutlined';

const LoginForm = ({
  onLogin, onEmailChange, email, isLoggingIn,
}) => (
  <form>
    <InputOutlined id="email" type="email" label="Email" onChange={onEmailChange} value={email} />
    <div className="login-button">
      <BlockButton type="submit" onClick={onLogin} isLoading={isLoggingIn}>Signin</BlockButton>
    </div>
  </form>
);

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

export default LoginForm;
