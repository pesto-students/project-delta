import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '30px',
    right: '30px',
  },
});

const FixedIconButtonComponent = ({ classes, className, ...props }) => (
  <Button variant="fab" color="primary" aria-label="Add" className={classNames(classes.button, className)} {...props} />
);

export const FixedIconButton = withStyles(styles)(FixedIconButtonComponent);
