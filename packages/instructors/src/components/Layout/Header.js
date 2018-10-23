import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React from 'react';

import { SIDE_MENU_WIDTH } from '../../../../shared-components/Theme';

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: SIDE_MENU_WIDTH,
    width: `calc(100% - ${SIDE_MENU_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
});

export const AppHeaderComponent = ({
  classes, className, isSideMenuOpen, toggleSideMenu, ...props
}) => (
  <AppBar
    position="absolute"
    className={classNames(classes.appBar, isSideMenuOpen ? classes.appBarShift : '', className)}
    {...props}
  >
    <Toolbar disableGutters={!isSideMenuOpen} className={classes.toolbar}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={toggleSideMenu}
        className={classNames(classes.menuButton, isSideMenuOpen ? classes.menuButtonHidden : '')}
      >
        <MenuIcon />
      </IconButton>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
        Batch
      </Typography>
    </Toolbar>
  </AppBar>
);

export const AppHeader = withStyles(styles)(AppHeaderComponent);
