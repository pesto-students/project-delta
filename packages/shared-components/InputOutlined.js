import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Colors } from './Theme';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    color: Colors.fontColor,
    flexBasis: '100%',
    margin: theme.spacing.unit,
  },
  input: {
    color: Colors.blackText,
  },
});

const InputOutlined = ({ classes, className, ...props }) => (
  <div className={classes.root}>
    <TextField
      className={classNames(classes.textField, className)}
      variant="outlined"
      {...props}
      InputProps={{ className: classes.input }}
    />
  </div>
);

export default withStyles(styles)(InputOutlined);
