import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import React from 'react';

import { MenuList } from './MenuList';

import { SIDE_MENU_WIDTH } from '../../../../shared-components/Theme';

const styles = theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: SIDE_MENU_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
});

const AppSideMenuComponent = ({
  classes, className, isSideMenuOpen, toggleSideMenu, ...props
}) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !isSideMenuOpen ? classes.drawerPaperClose : '', className),
    }}
    open={isSideMenuOpen}
    {...props}
  >
    <div className={classes.toolbarIcon}>
      <h2>Project Delta</h2>
      <IconButton onClick={toggleSideMenu}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <MenuList />
    </List>
  </Drawer>
);

export const AppSideMenu = withStyles(styles)(AppSideMenuComponent);
