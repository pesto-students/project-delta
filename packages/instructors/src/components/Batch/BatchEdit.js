import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BatchForm } from './BatchForm';

import './style.css';

class BatchEdit extends Component {
  render() {
    const {
      isUpdating, isEditAvailable, editableBatch, updateBatch,
    } = this.props;
    const isEditDisabled = false;
    return (
      <div className="form-container">
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={4}>
            <BatchForm
              isLoading={isUpdating}
              handleSubmit={updateBatch}
              key={editableBatch._id}
              isEditAvailable={isEditAvailable}
              isDisabled={isEditDisabled}
              editableBatch={editableBatch}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

BatchEdit.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  isEditAvailable: PropTypes.bool.isRequired,
  editableBatch: PropTypes.shape().isRequired,
  updateBatch: PropTypes.func.isRequired,
};

export { BatchEdit };
