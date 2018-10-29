import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AlertDialog } from '../../../../shared-components/AlertDialog';
import { deleteTopicFromList, fetchTopics, requestTopicEdit } from './action';
import { updateTitle } from '../Layout/action';

class TopicsListComponent extends React.Component {
  state = {
    options: {
      downloadOptions: { filename: 'topicsMaster.csv' },
      selectableRows: false,
    },
    deleteTopicId: '',
  }

  componentDidMount() {
    this.props.updateTitle('Topics Master');
    this.props.fetchTopics();
  }

  onEdit = (event) => {
    const { id } = event.currentTarget.dataset;
    this.props.requestEdit(id);
  }

  onDelete = () => {
    const { deleteTopicId } = this.state;
    this.props.requestDelete(deleteTopicId);
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
      name: 'Category',
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
    this.setState({ deleteTopicId: '' });
  };

  openDeleteModal = (event) => {
    const { id } = event.currentTarget.dataset;
    this.setState({ deleteTopicId: id });
  };

  addOptions = (value, tableMeta) => {
    const topicId = tableMeta.rowData[0];
    return (
      <React.Fragment>
        <IconButton className="primary-text" aria-label="Edit" onClick={this.onEdit} data-id={topicId}>
          <EditIcon />
        </IconButton>
        <IconButton className="danger-text" aria-label="Delete" onClick={this.openDeleteModal} data-id={topicId}>
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    );
  }

  formatData = topic => ([
    topic._id,
    topic.name,
    topic.category,
    topic.day,
    true,
  ]);

  render() {
    const { options, deleteTopicId } = this.state;
    const { topicList, isUpdating } = this.props.topics;

    const data = topicList.map(this.formatData);
    const columns = this.getColumns();

    return (
      <React.Fragment>
        <AlertDialog
          open={deleteTopicId !== ''}
          handleClose={this.closeDeleteModal}
          handleSuccess={this.onDelete}
          handleLoadingComplete={this.closeDeleteModal}
          title="Are you sure you want to delete?"
          content="Deleting topics will not be available to future batches.It won't remove from existing or previous batches."
          successText="Delete"
          disableBackdrop
          isLoading={isUpdating}
        />
        <MUIDataTable
          title="Topic List"
          options={options}
          data={data}
          columns={columns}
        />
      </React.Fragment>
    );
  }
}

TopicsListComponent.propTypes = {
  topics: PropTypes.shape().isRequired,
  fetchTopics: PropTypes.func.isRequired,
  requestEdit: PropTypes.func.isRequired,
  requestDelete: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topics: state.topics,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: bindActionCreators(fetchTopics, dispatch),
  requestEdit: bindActionCreators(requestTopicEdit, dispatch),
  requestDelete: bindActionCreators(deleteTopicFromList, dispatch),
  updateTitle: bindActionCreators(updateTitle, dispatch),
});

export const TopicsList = connect(mapStateToProps, mapDispatchToProps)(TopicsListComponent);
