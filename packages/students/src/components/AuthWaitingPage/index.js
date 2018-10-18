import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect } from 'react-router-dom';

import BoxComponent from '../../../../shared-components/BoxWithImgAndText';
import { HTTP as httpService } from '../../services/http';

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
    // eslint-disable-next-line react/destructuring-assignment
    const { token } = this.props.match.params;

    httpService.POST('/verifyToken', { token }, { 'Content-Type': 'application/json' }, false)
      .then(this.handleVerifyTokenResponse)
      .catch(console.error); // eslint-disable-line no-console
  }

  handleVerifyTokenResponse(res) {
    this.setState({ waiting: false, authSuccess: res.ok });
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
