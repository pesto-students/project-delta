import { withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LayersIcon from '@material-ui/icons/Layers';
import ClassIcon from '@material-ui/icons/Class';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Colors } from '../../../../shared-components/Theme';

const style = {
  active: {
    backgroundColor: Colors.primary,
    '&:hover': {
      backgroundColor: '#0069d9',
    },
    '&:disabled': {
      backgroundColor: '#0069d97d',
    },
  },
};

const MenuListComponent = ({ classes }) => (
  <React.Fragment>
    <ListItem button component={NavLink} to="/batch" activeClassName={`${classes.active} white-text`}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Batch" />
    </ListItem>
    <ListItem button component={NavLink} to="/topics" activeClassName={`${classes.active} white-text`}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Topics" />
    </ListItem>
  </React.Fragment>
);

MenuListComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export const MenuList = withStyles(style)(MenuListComponent);
