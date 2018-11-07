import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { userProfilePropType } from '../ProfilePage/shared';

export class DashboardContainer extends Component {
  render() {
    // if user went through magic sign-in, we will have at least his/her email
    const isLoggedIn = !!this.props.user.email;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    const isNewUser = !this.props.user._id;
    if (isNewUser) {
      return <Redirect to="/profile" />;
    }

    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <h1 className="text-center">Dashboard</h1>
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  user: userProfilePropType.isRequired,
};
