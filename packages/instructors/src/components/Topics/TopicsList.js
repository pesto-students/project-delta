import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTopics, requestTopicEdit } from './action';

class TopicsListComponent extends React.Component {
  state = {
    options: {
      downloadOptions: { filename: 'topicsMaster.csv' },
      selectableRows: false,
    },
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  onEdit = (event) => {
    const { id } = event.currentTarget.dataset;
    this.props.requestEdit(id);
  }

  getColumns = () => {
    const columns = [{
      name: '_id',
      options: {
        display: 'excluded',
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
        customBodyRender: this.addOptions,
      },
    }];

    return columns;
  }

  addOptions = (value, tableMeta) => {
    const topicId = tableMeta.rowData[0];
    return (
      <IconButton className="primary-text" aria-label="Edit" onClick={this.onEdit} data-id={topicId}>
        <EditIcon />
      </IconButton>
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
    const { options } = this.state;
    const { topicList } = this.props.topics;

    const data = topicList.map(this.formatData);
    const columns = this.getColumns();
    return (
      <MUIDataTable
        title="Topic's Master"
        options={options}
        data={data}
        columns={columns}
      />
    );
  }
}

TopicsListComponent.propTypes = {
  topics: PropTypes.shape().isRequired,
  fetchTopics: PropTypes.func.isRequired,
  requestEdit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topics: state.topics,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: bindActionCreators(fetchTopics, dispatch),
  requestEdit: bindActionCreators(requestTopicEdit, dispatch),
});

export const TopicsList = connect(mapStateToProps, mapDispatchToProps)(TopicsListComponent);
