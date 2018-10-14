import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

import { Colors } from './Theme';

const styles = theme => ({
  button: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    textTransform: 'none',
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

const BlockButton = ({
  classes,
  className,
  isLoading,
  children,
  ...props
}) => (
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
);

export default withStyles(styles)(BlockButton);
