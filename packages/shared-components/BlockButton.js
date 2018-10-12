import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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
  buttonFocused: {
    backgroundColor: '#0069d9',
  },
});

const BlockButton = ({ classes, ...props }) => <Button fullWidth variant="contained" className={classes.button} {...props} />;

export default withStyles(styles)(BlockButton);
