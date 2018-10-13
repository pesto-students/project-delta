import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Colors } from './Theme';

const styles = () => ({
  button: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
});

const BlockButton = ({ classes, className, ...props }) => (
  <Button
    fullWidth
    variant="contained"
    className={classNames(classes.button, className)}
    {...props}
  />
);

export default withStyles(styles)(BlockButton);
