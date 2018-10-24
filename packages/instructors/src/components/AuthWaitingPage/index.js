import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect } from 'react-router-dom';

import BoxComponent from '../../../../shared-components/BoxWithImgAndText';
import { verifyToken } from '../../services/authWaiting';

import './blink.css';

class AuthWaitingComponent extends React.Component {
  state = {
    waiting: true,
    isAuthSuccess: false,
  };

  componentDidMount() {
    const { token } = this.props.match.params;

    verifyToken({ token })
      .then(this.handleVerifyTokenResponse)
      .catch(console.error); // eslint-disable-line no-console
  }

  handleVerifyTokenResponse = (res) => {
    const isAuthSuccess = res.authentication === 'success';
    this.setState({ waiting: false, isAuthSuccess });
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

    const { waiting, isAuthSuccess } = this.state;

    if (waiting) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item xs={12} md={8} lg={6}>
            <BoxComponent bgUrl="/images/logo.jpeg" text="authenticating with server..." {...styles} />
          </Grid>
        </Grid>
      );
    }

    if (isAuthSuccess) {
      return <Redirect to="/" />;
    }

    return <Redirect to="/login" />;
  }
}

export { AuthWaitingComponent };
