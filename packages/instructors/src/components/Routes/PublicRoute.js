import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator';

class PublicRouteComponent extends React.Component {
  componentDidMount() {
    const { authUser, validateLogin } = this.props;
    if (!authUser.isUserLogged) {
      validateLogin();
    }
  }

  render() {
    const {
      component: Component, authUser, validateLogin, ...rest
    } = this.props;

    if (authUser.isLoggingIn) {
      return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
          <LoadingIndicator />
        </Grid>
      );
    }

    if (authUser.isUserLogged) {
      return <Redirect to="/topics" />;
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

export { PublicRouteComponent };
