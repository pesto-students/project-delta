import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect } from 'react-router-dom';

import BoxComponent from '../../../../shared-components/BoxWithImgAndText';
import { HTTP as httpService } from '../../services/http';
import { getCookie } from '../../services/cookie';

import './blink.css';

export class AuthWaitingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      authSuccess: false,
    };

    this.handleVerifyTokenResponse = this.handleVerifyTokenResponse.bind(this);
  }

  componentDidMount() {
    const curUrlParts = window.location.pathname.toString().split('/');
    const token = curUrlParts[curUrlParts.length - 1];

    httpService.POST('/verifyToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { token },
    }).then(this.handleVerifyTokenResponse)
      .catch(console.error); // eslint-disable-line no-console
  }

  handleVerifyTokenResponse(res) {
    if (!res.ok) {
      this.setState({ waiting: false, authSuccess: false });
    } else {
      // Set-Cookie headers of the response would have put token in document.cookie
      // Extract it from there and place it in localStorage so future requests made by
      //   our http service can pick it up
      const token = getCookie('token');
      if (token !== null) {
        localStorage.setItem('token', token);
      }
      this.setState({ waiting: false, authSuccess: true });
    }
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

    const { waiting, authSuccess } = this.state;

    if (waiting) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item xs={12} md={8} lg={6}>
            <BoxComponent bgUrl="/images/logo.jpeg" text="authenticating with server..." {...styles} />
          </Grid>
        </Grid>
      );
    }

    if (authSuccess) {
      return <Redirect to="/dashboard" />;
    }

    return <Redirect to="/" />;
  }
}
