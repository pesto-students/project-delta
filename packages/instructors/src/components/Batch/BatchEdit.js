import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isFuture from 'date-fns/is_future';

import { BatchForm } from './BatchForm';
import { editBatch, updateBatchList } from './action';
import { updateTitle } from '../Layout/action';

import './style.css';

class BatchEditComponent extends Component {
  componentDidMount() {
    const { requestEdit, batchId, changeTitle } = this.props;
    requestEdit(batchId);
    changeTitle('Modify Batch');
  }

  render() {
    const {
      isUpdating, isEditAvailable, editableBatch, updateBatch,
    } = this.props;
    const isEditDisabled = !isFuture(editableBatch.startDate);
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

BatchEditComponent.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  isEditAvailable: PropTypes.bool.isRequired,
  editableBatch: PropTypes.shape().isRequired,
  updateBatch: PropTypes.func.isRequired,
  requestEdit: PropTypes.func.isRequired,
  batchId: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { isUpdating, isEditAvailable, editableBatch } = state.batches;
  return {
    isUpdating,
    isEditAvailable,
    editableBatch,
  };
};

const mapDispatchToProps = dispatch => ({
  updateBatch: bindActionCreators(updateBatchList, dispatch),
  requestEdit: bindActionCreators(editBatch, dispatch),
  changeTitle: bindActionCreators(updateTitle, dispatch),
});

export const BatchEdit = connect(mapStateToProps, mapDispatchToProps)(BatchEditComponent);
