import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AlertDialog } from '../../../../shared-components/AlertDialog';
import { deleteExerciseFromList, fetchExercises, requestExerciseEdit } from './action';
import { updateTitle } from '../Layout/action';

class ExerciseListComponent extends React.Component {
  state = {
    options: {
      downloadOptions: { filename: 'exercisesMaster.csv' },
      selectableRows: false,
    },
    deleteExerciseId: '',
  }

  componentDidMount() {
    this.props.updateTitle('Exercises Master');
    this.props.fetchExercises();
  }

  onEdit = (event) => {
    const { id } = event.currentTarget.dataset;
    this.props.requestEdit(id);
  }

  onDelete = () => {
    const { deleteExerciseId } = this.state;
    this.props.requestDelete(deleteExerciseId);
  }

  getColumns = () => {
    const columns = [{
      name: '_id',
      options: {
        display: 'excluded',
        filter: false,
      },
    }, {
      name: 'Name',
      options: {
        filter: false,
      },
    }, {
      name: 'Topic',
    }, {
      name: 'Day',
    }, {
      name: 'Options',
      options: {
        filter: false,
        customBodyRender: this.addOptions,
      },
    }];

    return columns;
  }

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
        <IconButton className="primary-text" aria-label="Edit" onClick={this.onEdit} data-id={exerciseId}>
          <EditIcon />
        </IconButton>
        <IconButton className="danger-text" aria-label="Delete" onClick={this.openDeleteModal} data-id={exerciseId}>
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    );
  }

  formatData = exercise => ([
    exercise._id,
    exercise.name,
    exercise.topicName,
    exercise.day,
    true,
  ]);

  render() {
    const { options, deleteExerciseId } = this.state;
    const { exerciseList, isUpdating } = this.props.exercises;

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
          content="Deleting exercises will not be available to future batches. It won't remove from existing or previous batches."
          successText="Delete"
          disableBackdrop
          isLoading={isUpdating}
        />
        <MUIDataTable
          title="Exercise List"
          options={options}
          data={data}
          columns={columns}
        />
      </React.Fragment>
    );
  }
}

ExerciseListComponent.propTypes = {
  exercises: PropTypes.shape().isRequired,
  fetchExercises: PropTypes.func.isRequired,
  requestEdit: PropTypes.func.isRequired,
  requestDelete: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  exercises: state.exercises,
});

const mapDispatchToProps = dispatch => ({
  fetchExercises: bindActionCreators(fetchExercises, dispatch),
  requestEdit: bindActionCreators(requestExerciseEdit, dispatch),
  requestDelete: bindActionCreators(deleteExerciseFromList, dispatch),
  updateTitle: bindActionCreators(updateTitle, dispatch),
});

export const ExerciseList = connect(mapStateToProps, mapDispatchToProps)(ExerciseListComponent);
