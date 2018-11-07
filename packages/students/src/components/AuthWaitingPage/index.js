import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { saveToken, removeToken } from '../../../../shared-utils/services/loginToken';
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
      this.props.setUserData({
        _id: res._id,
        email: res.email,
        profilePicUrl: res.profilePicUrl,
      });
    } else {
      removeToken();
    }

    this.setState({
      waiting: false,
      authSuccess: isAuthSuccess,
    });
  }

  render() {
    const styles = {
      additionalBoxStyles: {
        backgroundColor: '#EFEFEF',
        borderRadius: '10px',
      },
      additionalBoxImgStyles: {
        height: '100px',
        width: '100px',
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
        <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
          <Grid item xs={11} md={8} lg={6}>
            <BoxComponent bgUrl={logoImg} text="authenticating with server..." {...styles} />
          </Grid>
        </Grid>
      );
    }

    if (!authSuccess) {
      return <Redirect to="/" />;
    }

    return <Redirect to="/dashboard" />;
  }
}

AuthWaitingComponent.propTypes = {
  setUserData: PropTypes.func.isRequired,
};
