import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
  toolbar: {
    justifyContent: 'center',
  },
  formControl: {
    margin: '0px 10px',
  },
  h4: {
    marginRight: theme.spacing.unit * 2,
  },
});

export const FilterComponent = ({
  classes, batchList, batchId, handleBatchChange,
}) => (
  <AppBar position="static" color="default" className={classes.root}>
    <Toolbar className={classes.toolbar}>
      <Hidden smDown>
        <h4 className={classes.h4}>Choose Batch</h4>
      </Hidden>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="batch-number">Batch</InputLabel>
        <Select
          value={batchId}
          onChange={handleBatchChange}
          inputProps={{
            name: 'batch-number',
            id: 'batch-number',
          }}
        >
          {batchList.map(batch => (
            <MenuItem key={batch._id} value={batch._id}>
              {batch.batchNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="city">City</InputLabel>
        <Select
          disabled
          inputProps={{
            name: 'city',
            id: 'city',
          }}
          value={batchId}
        >
          {batchList.map(batch => (
            <MenuItem key={`city-${batch._id}`} value={batch._id}>
              {batch.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  </AppBar>
);

FilterComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  batchList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  batchId: PropTypes.string.isRequired,
  handleBatchChange: PropTypes.func.isRequired,
};

export const Filter = withStyles(styles)(FilterComponent);
