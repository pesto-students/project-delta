import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

import { BatchViewContainer } from '../Batch/BatchViewContainer';
import { NewBatchContainer } from '../Batch/NewBatchContainer';
import { TopicsMasterContainer } from '../Topics';
import { AppHeader } from './Header';
import { AppSideMenu } from './SideMenu';
import { AlertSnackBar } from '../../../../shared-components/AlertSnackBar';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class AppLayoutComponent extends React.Component {
  state = {
    isSideMenuOpen: true,
  };

  toggleSideMenu = () => {
    this.setState(state => ({
      isSideMenuOpen: !state.isSideMenuOpen,
    }));
  };

  render() {
    const {
      classes, title, hasAlert, removeAlert, message, alertType,
    } = this.props;
    const { isSideMenuOpen } = this.state;

    return (
      <React.Fragment>
        <AlertSnackBar
          open={hasAlert}
          onClose={removeAlert}
          message={message}
          type={alertType}
        />
        <CssBaseline />
        <div className={classes.root}>
          <AppHeader
            isSideMenuOpen={isSideMenuOpen}
            toggleSideMenu={this.toggleSideMenu}
            title={title}
          />
          <AppSideMenu isSideMenuOpen={isSideMenuOpen} toggleSideMenu={this.toggleSideMenu} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route path="/batch" exact component={BatchViewContainer} />
            <Route path="/batch/new" exact component={NewBatchContainer} />
            <Route path="/topics" exact component={TopicsMasterContainer} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

AppLayoutComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hasAlert: PropTypes.bool.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

export const AppLayout = withStyles(styles)(AppLayoutComponent);