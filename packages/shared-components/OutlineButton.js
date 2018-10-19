import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

import { Colors } from './Theme';

const styles = theme => ({
  button: {
    color: Colors.primary,
    borderColor: Colors.primary,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 105, 217, 0.21)',
    },
    '&:disabled': {
      backgroundColor: '#0069d97d',
    },
    margin: theme.spacing.unit,
  },
  progress: {
    marginRight: theme.spacing.unit * 2,
  },
});

const OutlineButtonComponent = ({
  classes,
  className,
  isLoading,
  children,
  ...props
}) => (
  <Button
    variant="outlined"
    className={classNames(classes.button, className)}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? <CircularProgress color="inherit" className={classes.progress} size={20} /> : null}
    {children}
  </Button>
);

export const OutlineButton = withStyles(styles)(OutlineButtonComponent);
