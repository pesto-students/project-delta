import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import { LoginHeader } from './Header';
import { LoginFooter } from './Footer';
import BlockButton from '../../../shared-components/BlockButton';
import InputOutlined from '../../../shared-components/InputOutlined';
import './style.css';

class LoginContainer extends Component {
  render() {
    return (
      <div className="login-container">
        <Grid container justify="center" style={{ height: '100%' }}>
          <Grid item xs={10} md={8} lg={7}>
            <LoginHeader />
          </Grid>

          <Grid item xs={12} md={8} lg={7}>
            <Grid container justify="center">
              <Grid item xs={12} md={8} lg={6}>
                <p style={{ textAlign: 'center' }}>
                  Thank you for your interest in applying to Pesto!
                </p>
                <p style={{ textAlign: 'center' }}>
                  Enter your email below to get started.
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={10} md={8} lg={7}>
            <Grid container justify="center">
              <Grid item xs={12} md={8} lg={6}>
                <form>
                  <InputOutlined id="email" type="email" label="Email" />
                  <div style={{ margin: '8px', marginTop: '20px' }}>
                    <BlockButton type="submit" style={{ minHeight: '50px', fontSize: '15px' }}>Signin</BlockButton>
                  </div>
                </form>
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
