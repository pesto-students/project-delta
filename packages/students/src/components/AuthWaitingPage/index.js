import BoxComponent from 'shared-components/BoxComponent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { API_URL } from '../../config';

class AuthWaitingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      authSuccess: false,
    };
  }

  componentDidMount() {
    const curUrlParts = window.location.toString().split('/');
    const token = curUrlParts[curUrlParts.length - 1];

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { token },
    }).then((res) => {
      this.setState({ waiting: false, authSuccess: res.ok });
    }).catch((e) => {
      console.error(e); // eslint-disable-line no-console
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

export default AuthWaitingComponent;
