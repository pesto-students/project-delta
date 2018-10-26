import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { LoadingIndicator } from '../../../../shared-components/LoadingIndicator';

class PrivateRouteComponent extends React.Component {
  componentDidMount() {
    this.props.validateLogin();
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
      return <Route {...rest} render={props => <Component {...props} />} />;
    }

    return <Redirect to="/login" />;
  }
}

export { PrivateRouteComponent };
