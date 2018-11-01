import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AlertDialog } from '../../../../shared-components/AlertDialog';
import { deleteBatchExerciseFromList } from './action';

class BatchExerciseComponent extends React.Component {
  state = {
    options: {
      downloadOptions: { filename: 'exercisesBatch.csv' },
      selectableRows: false,
    },
    deleteExerciseId: '',
  };

  onDelete = () => {
    const { deleteExerciseId } = this.state;
    const { requestDelete } = this.props;
    requestDelete(deleteExerciseId);
  };

  getColumns = () => {
    const columns = [
      {
        name: '_id',
        options: {
          display: 'excluded',
          filter: false,
        },
      },
      {
        name: 'Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'Topic',
      },
      {
        name: 'Day',
      },
      {
        name: 'Options',
        options: {
          filter: false,
          customBodyRender: this.addOptions,
        },
      },
    ];

    return columns;
  };

  closeDeleteModal = () => {
    this.setState({ deleteExerciseId: '' });
  };

  openDeleteModal = (event) => {
    const { id } = event.currentTarget.dataset;
    this.setState({ deleteExerciseId: id });
  };

  addOptions = (value, tableMeta) => {
    const exerciseId = tableMeta.rowData[0];
    return (
      <React.Fragment>
        <IconButton
          className="danger-text"
          aria-label="Delete"
          onClick={this.openDeleteModal}
          data-id={exerciseId}
        >
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    );
  };

  formatData = exercise => [
    exercise._id,
    exercise.name,
    exercise.batchTopicName,
    exercise.day,
    true,
  ];

  render() {
    const { options, deleteExerciseId } = this.state;
    const { exerciseList } = this.props;

    const data = exerciseList.map(this.formatData);
    const columns = this.getColumns();

    return (
      <React.Fragment>
        <AlertDialog
          open={deleteExerciseId !== ''}
          handleClose={this.closeDeleteModal}
          handleSuccess={this.onDelete}
          handleLoadingComplete={this.closeDeleteModal}
          title="Are you sure you want to delete?"
          content="Deleting exercises will remove from current batch. It won't remove from master exercises."
          successText="Delete"
          disableBackdrop
        />
        <MUIDataTable title="Exercise List" options={options} data={data} columns={columns} />
      </React.Fragment>
    );
  }
}

BatchExerciseComponent.propTypes = {
  exerciseList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  requestDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  exerciseList: state.batches.exerciseList,
});

const mapDispatchToProps = dispatch => ({
  requestDelete: bindActionCreators(deleteBatchExerciseFromList, dispatch),
});

export const BatchExerciseList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BatchExerciseComponent);
