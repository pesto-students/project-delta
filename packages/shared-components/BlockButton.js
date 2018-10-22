import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

import { Colors } from './Theme';

const styles = theme => ({
  buttonContainer: {
    margin: theme.spacing.unit,
  },
  button: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    textTransform: 'none',
    minHeight: '50px',
    fontSize: '15px',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
    '&:disabled': {
      backgroundColor: '#0069d97d',
    },
  },
  progress: {
    marginRight: theme.spacing.unit * 2,
  },
});

const BlockButtonComponent = ({
  classes,
  className,
  isLoading,
  children,
  ...props
}) => (
  <div className={classes.buttonContainer}>
    <Button
      fullWidth
      variant="contained"
      className={classNames(classes.button, className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <CircularProgress color="inherit" className={classes.progress} size={20} /> : null}
      {children}
    </Button>
  </div>
);

export const BlockButton = withStyles(styles)(BlockButtonComponent);
