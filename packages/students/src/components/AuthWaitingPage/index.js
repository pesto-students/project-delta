import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { saveToken } from '../../../../shared-utils/services/loginToken';
import BoxComponent from '../../../../shared-components/BoxWithImgAndText';
import { HTTP as httpService } from '../../../../shared-utils/services/http';

import logoImg from '../../../../shared-components/assets/logo.png';

import './blink.css';

export class AuthWaitingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      authSuccess: false,
      isNewUser: false,
      email: null,
    };

    this.handleVerifyTokenResponse = this.handleVerifyTokenResponse.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { token } = this.props.match.params;

    httpService.POST('/verifyToken', { token }, undefined, true)
      .then(this.handleVerifyTokenResponse)
      .catch(console.error); // eslint-disable-line no-console
  }

  handleVerifyTokenResponse(res) {
    const isAuthSuccess = res.authentication === 'success';
    if (isAuthSuccess) {
      saveToken(res.token);
    }
    this.setState({
      waiting: false,
      authSuccess: res.authentication,
      isNewUser: res.isNewUser,
      email: res.email,
    });
  }

  render() {
    const styles = {
      additionalBoxStyles: {
        backgroundColor: '#EFEFEF',
        borderRadius: '10px',
      },
      additionalBoxImgStyles: {
        border: '10px solid white',
        borderRadius: '50%',
        height: '100px',
        width: '100px',

        margin: '20px 0',
      },
      additionalBoxTextStyles: {
        animationDuration: '1.5s',
        animationName: 'blink',
        animationIterationCount: 'infinite',

        color: 'gray',
        fontSize: '0.8em',

        margin: '20px 0',
      },
    };

    const { waiting, authSuccess, isNewUser } = this.state;

    if (waiting) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item xs={12} md={8} lg={6}>
            <BoxComponent bgUrl={logoImg} text="authenticating with server..." {...styles} />
          </Grid>
        </Grid>
      );
    }

    if (!authSuccess) {
      return <Redirect to="/" />;
    }

    if (isNewUser) {
      return (
        <Redirect
          to={{
            pathname: '/profile',
            state: { editing: true, loading: false, user: { email: this.state.email } },
          }}
        />
      );
    }

    return <Redirect to="/dashboard" />;
  }
}
